import React from 'react';
import { Provider } from 'react-redux';
import './App.styles.pcss';
import store from '../../store';
import SearchTaxiCard from '../SearchTaxiCard';


const cn = 'app'

const App: React.FunctionComponent = () => {
  return (
    <Provider store={ store() }>
      <div className={ cn }>
        <SearchTaxiCard />
      </div>
    </Provider>
  );
}

export default App;
