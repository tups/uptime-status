import {useEffect, useState} from 'react';
import Link from './link';

function Header() {

    const [countdown, setCountdown] = useState(300);
    const [now, setNow] = useState(new Date());

    document.title = window.Config.MetaTitle;
    document.getElementsByTagName('meta')["description"].content = window.Config.MetaDescription;

    useEffect(() => {

        const interval = setInterval(() => {
            let countdownState = countdown - 1;
            if (!countdown) {
                countdownState = 300;
                setNow(new Date());
            }
            setCountdown(countdownState);
        }, 1000);

        return () => clearInterval(interval);

    }, [countdown]);

    return (
        <div id='header'>
            <div className='container'>
                <h1 className='logo'>
                    <img src="/img/logo-beekube.svg" className="logo__img" alt="Logo Beekube" width="64" height="70" />
                        <span className="logo__text">{window.Config.SiteName}</span>
                </h1>
                <div className='hinfo'>
                    <div className="hinfo__title">Statut des services</div>
                    <div className="hinfo__maj">Dernières mise à jour {now.toLocaleTimeString('fr-FR')} | Mise à jour
                        dans {Math.floor(countdown / 60)}:{countdown % 60}</div>
                </div>
            </div>
        </div>
);
}


export default Header;
