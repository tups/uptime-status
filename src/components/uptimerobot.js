import {useEffect, useState} from 'react';
import {GetMonitors} from '../common/uptimerobot';
import {formatDuration, formatNumber} from '../common/helper';
import Link from './link';
import {Tooltip} from "react-tooltip";
import moment, {duration} from "moment";

function UptimeRobot({apikey}) {
    
    const status = {
        ok: 'Opérationnel',
        down: 'Inaccessible',
        unknow: 'Inconnue'
    };
    
    const {CountDays, ShowLink} = window.Config;
    
    const [monitors, setMonitors] = useState();
    
    useEffect(() => {
        GetMonitors(apikey, CountDays).then(setMonitors);
        const interval = setInterval(() => {
            GetMonitors(apikey, CountDays).then(setMonitors);
        }, 300000);
        return () => clearInterval(interval);
    }, [apikey, CountDays]);
    
    
    if (monitors) return monitors.map((site) => (
      <div key={site.id}>
          <div className='site well'>
              
              <div className='meta'>
                  <div className={'meta__app'}>
                      <span className='name' dangerouslySetInnerHTML={{__html: site.name}}/>
                      {ShowLink && <Link className='link' to={site.url} text={site.name}/>}
                      <span className={'average'}>{site.total.times ? `${site.average}%` : `Disponibilité des derniers ${CountDays} jours pendant ${site.average}%`} <span className='average__unit'>sur {CountDays} jours</span></span>
                  </div>
                  
                  <div className={'status ' + site.status}>{status[site.status]}</div>
              </div>
              <div className='timeline__block'>
                  <div className='timeline'>
                      {site.daily.map((data, index) => {
                          let status = '';
                          let text = data.date.format('YYYY-MM-DD ');
                          if (data.uptime >= 100) {
                              status = 'ok';
                              text += `OK : ${formatNumber(data.uptime)}%`;
                          } else if (data.uptime <= 0 && data.down.times === 0) {
                              status = 'none';
                              text += 'Pas de données';
                          } else {
                              status = 'down';
                              text += `Défaut ${data.down.times} fois，pendant ${formatDuration(data.down.duration)}，en ligne ${formatNumber(data.uptime)}%`;
                          }
                          return (
                            <>
                                <i id={`day-${index}`} key={index} className={status} data-st={data.uptime}
                                   style={{'--average': getColor(data.uptime)}}/>
                                <Tooltip key={`tooltip-day-${index}`} anchorId={`day-${index}`} className='tooltip'
                                         place='top' type='dark' effect='solid'>
                                    <div>{text}</div>
                                </Tooltip>
                            </>
                          )
                      })}
                  </div>
              </div>
              
              <div className='summary'>
                  <span>{site.daily[site.daily.length - 1].date.format('YYYY-MM-DD')}</span>
              </div>
          
          </div>
          
          <h2>Incidents passés</h2>
          
          <div className={'well'}>
              <div className={'logs'}>
                  {site.logs.map((data, index) => {
                      
                      if(data.type === 1 ) {
                          return ;
                      }
                      
                      const logDuration = duration(data.duration).humanize();
                      const logDate = moment(data.datetime, 'X').format('LLLL');
                      return (
                        <div className={'log'} key={`log-${index}`}>
                            <h3 className={'log__title'}>
                                {(data.type === 2 ? `Indisponible pendant ${logDuration}` : '' )}
                            </h3>
                            <p className={'log__desc'}>{data.reason.detail}</p>
                            <p className={'log__date'}>{logDate}</p>
                        </div>
                      );
                  })}
              </div>
          </div>
      </div>
    ));
    
    else return (
      <div className='site'>
          <div className='loading'/>
      </div>
    );
}

function getColor(average) {
    switch (true) {
        case average >= 100:
            return 120;
        case average >= 99:
            return 90;
        case average >= 98:
            return 50;
        default:
            return 0;
    }
}

export default UptimeRobot;
