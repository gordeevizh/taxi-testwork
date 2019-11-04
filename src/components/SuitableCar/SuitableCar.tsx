import React from 'react';
import { useSelector } from 'react-redux';
import { ISuitableCarProps } from './SuitableCar.types';
import { IStore } from '../../store/store.types';
import CarCard from '../CarCard';

import './SuitableCar.styles.pcss';

const cn = 'suitable-car';

const SuitableCar: React.FunctionComponent<ISuitableCarProps> = (props:ISuitableCarProps) => {
  const cars = useSelector((state: IStore) => state.cars);
  const suitableCar = cars && cars[0];
  const carName = cars && `${suitableCar.car_mark} ${suitableCar.car_model}`;

  return (
    <label className={ cn }>
      <span className={ `${cn}__title` }>Подходящий экипаж: </span>
     { suitableCar && (
        <CarCard 
          carName={ carName }
          color={ suitableCar.car_color }
          distance={ suitableCar.distance }
        />
     ) }
    </label>
  );
}

export default SuitableCar;