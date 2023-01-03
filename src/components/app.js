import { useMemo } from 'react';
import Link from './link';
import Header from './header';
import UptimeRobot from './uptimerobot';
import Package from '../../package.json';

function App() {

  const apikeys = useMemo(() => {
    const { ApiKeys } = window.Config;
    if (Array.isArray(ApiKeys)) return ApiKeys;
    if (typeof ApiKeys === 'string') return [ApiKeys];
    return [];
  }, []);

  return (
    <>
      <Header />
      <div className='container'>
        <div id='uptime'>
          {apikeys.map((key) => (
            <UptimeRobot key={key} apikey={key} />
          ))}
        </div>
        <div id='footer'>
          <p>basé sur <Link to='https://uptimerobot.com/' text='UptimeRobot' />Production d'interface, fréquence de détection 5 minutes</p>
          <p>&copy; 2022 <Link to='https://www.beekube.com/' text='beekube.com' />, Version {Package.version}</p>
        </div>
      </div>
    </>
  );
}

export default App;
