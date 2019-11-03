import React from 'react';
import './Card.styles.pcss';

const cn = 'card'

const Card: React.FunctionComponent = (props) => {
  return (
    <div className={ cn }>
      { props.children }
    </div>
  )
}

export default Card;