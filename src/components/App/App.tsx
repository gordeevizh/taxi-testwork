import React from 'react';
import './App.styles.pcss';
import Card from '../Card';
import Input from '../Input';
import Map from '../Map';
import SuitableCar from '../SuitableCar';

const cn = 'app'

const App: React.FC = () => {
  return (
    <div className={ cn }>
      <Card>
        <h1 className={ `${cn}-title` }>Детали заказа</h1>
        <Input 
          label={ 'Откуда: ' }
        />
        <SuitableCar />
        <Map />
      </Card>
    </div>
  );
}

export default App;
