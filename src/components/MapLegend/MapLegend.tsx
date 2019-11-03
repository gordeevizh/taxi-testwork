import React from 'react';
import CarCard from '../CarCard';
import { IMapLegend } from './MapLegend.types';

import './MapLegend.styles.pcss';

const cn = 'map-legend';

const MapLegend: React.FunctionComponent<IMapLegend> = (props: IMapLegend) => {
  return (
    <ul className={ cn }>
      <li className={ `${cn}__item`}>
        <CarCard 
          carName={ 'Hyundai Solaris' }
          color={ 'Синий' }
          distance={ 300 }
        />
      </li>
      <li className={ `${cn}__item`}>
        <CarCard 
          carName={ 'Hyundai Elantra' }
          color={ 'Красный' }
          distance={ 300 }
        />
      </li>
      <li className={ `${cn}__item`}>
        <CarCard 
          carName={ 'Renault Logan' }
          color={ 'Серый' }
          distance={ 300 }
        />
      </li>
      <li className={ `${cn}__item`}>
        <CarCard 
          carName={ 'Hyundai Solaris' }
          color={ 'Синий' }
          distance={ 300 }
        />
      </li>
    </ul>
  );
}

export default MapLegend;