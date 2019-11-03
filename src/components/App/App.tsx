import React from 'react';
import logo from '../../logo.svg';
import './App.styles.pcss';
import Card from '../Card';
import Input from '../Input';
import CarCard from '../CarCard';

const cn = 'app'

const App: React.FC = () => {
  return (
    <div className={ cn }>
      <Card>
        <h1 className={ `${cn}-title` }>Детали заказа</h1>
        <Input 
          label={ 'Откуда: ' }
        />
        <CarCard 
          carName={ 'Hyundai Solaris' }
          color={ 'Синий' }
          distance={ 300 }
        />
      </Card>
    </div>
  );
}

export default App;
