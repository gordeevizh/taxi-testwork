import React from 'react';
import { useSelector } from 'react-redux';
import CarCard from '../CarCard';
import { IMapLegend } from './MapLegend.types';
import { IStore } from '../../store/store.types';

import './MapLegend.styles.pcss';

const cn = 'map-legend';

const MapLegend: React.FunctionComponent<IMapLegend> = (props: IMapLegend) => {
  const cars = useSelector((state: IStore) => state.cars);
  
  return (
    <ul className={ cn }>
      { cars && cars.map(car => (
        <li className={ `${cn}__item`} key={ car.crew_id}>
          <CarCard 
            carName={ `${car.car_mark} ${car.car_model}` }
            color={ car.car_color }
            distance={ car.distance }
          />
        </li>
      )) }
    </ul>
  );
}

export default MapLegend;