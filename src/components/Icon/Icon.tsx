import React from 'react';
import { IIconProps } from './Icon.types';

const Icon: React.FunctionComponent<IIconProps> = (props: IIconProps) => {
  const { className, viewBox, id, onClick } = props;

  return (
    <svg
      onClick={ onClick }
      className={ className }
      viewBox={ viewBox }
    >
      <use xlinkHref={ `#${id}` } />
    </svg>
  );
};

export default Icon;
