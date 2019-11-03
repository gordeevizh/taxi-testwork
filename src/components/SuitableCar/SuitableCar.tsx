import React from 'react';
import { ISuitableCarProps } from './SuitableCar.types';
import CarCard from '../CarCard';

import './SuitableCar.styles.pcss';

const cn = 'suitable-car';

const SuitableCar: React.FunctionComponent<ISuitableCarProps> = (props:ISuitableCarProps) => {
  return (
    <label className={ cn }>
      <span className={ `${cn}__title` }>Подходящий экипаж: </span>
      <CarCard 
        carName={ 'Hyundai Solaris' }
        color={ 'Синий' }
        distance={ 300 }
      />
    </label>
  );
}

export default SuitableCar;