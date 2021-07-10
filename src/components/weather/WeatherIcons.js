import React from 'react';
import { ReactComponent as Sunny } from '../../images/weather-icons/zon.svg';
import { ReactComponent as Rain } from '../../images/regen.svg';
import { ReactComponent as Clouds } from '../../images/weather-icons/bewolkt.svg';
import { ReactComponent as Snow } from '../../images/weather-icons/sneeuw.svg';
import { ReactComponent as Wind } from '../../images/weather-icons/wind.svg';
import { ReactComponent as Drizzle } from '../../images/weather-icons/regen-zon.svg';
import { ReactComponent as Mist } from '../../images/weather-icons/mist.svg';
import { ReactComponent as Mist2 } from '../../images/weather-icons/mist2.svg';


function weatherIcons(weatherType) {
    switch (weatherType) {
        case 'Clear':
            return <Sunny />;
        case 'Clouds':
            return <Clouds />;
        case 'Drizzle':
            return <Drizzle />;
        case 'Rain':
            return <Rain />;
        case 'Snow':
            return <Snow />;
        case 'Mist':
            return <Mist />;
        case 'Fog':
            return <Mist2 />;
        case 'Haze':
        case 'Smoke':
        default:
            return <Wind />;
    }
}

export default weatherIcons;
