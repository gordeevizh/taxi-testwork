import React from 'react';
import { ICarCardProps } from './CarCard.types';
import CarIcon from '../../assets/images/car.svg';
import Icon from '../Icon';
import './CarCard.styles.pcss';

const cn = 'car-card';

const CarCard: React.FunctionComponent<ICarCardProps> = (props: ICarCardProps) => {
  const { color, carName, distance } = props;

  return (
    <section className={ cn }>
      <Icon
        className={ `${cn}__icon` }
        id={ CarIcon.id }
        viewBox={ CarIcon.viewBox }
      />

      <article className={ `${cn}__description` }>
        <h3 className={ `${cn}__name` }>
          { carName }
        </h3>
        <span className={ `${cn}__color` }>
          { color }
        </span>
      </article>

      <div className={ `${cn}__distance` }>{ distance }м </div>
    </section>
  );  
}

export default CarCard;
