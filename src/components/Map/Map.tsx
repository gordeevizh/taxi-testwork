import React from 'react';
import MapLegend from '../MapLegend';
import { IMapProps } from './Map.types';

import './Map.styles.pcss';

const cn = 'map'

const Map: React.FunctionComponent<IMapProps> = (props: IMapProps) => {
  return (
    <section className={ cn }>
      <div className={ `${cn}__yamap`}>

      </div>
      <MapLegend />
    </section>
  );
}

export default Map;