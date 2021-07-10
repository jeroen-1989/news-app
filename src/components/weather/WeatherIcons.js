import React from 'react';
import { ReactComponent as Sunny } from '../../images/zon.svg';
import { ReactComponent as Rain } from '../../images/regen.svg';
import { ReactComponent as Clouds } from '../../images/bewolkt.svg';
import { ReactComponent as Snow } from '../../images/sneeuw.svg';
import { ReactComponent as Wind } from '../../images/wind.svg';
import { ReactComponent as Drizzle } from '../../images/regen-zon.svg';
import { ReactComponent as Mist } from '../../images/mist.svg';
import { ReactComponent as Mist2 } from '../../images/mist2.svg';


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
