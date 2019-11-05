import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducer from './reducers';
import { IStore } from './store.types';

const initialStatedefault: IStore = {
  address: '',
  errors: [],
  isLoading: false,
  cars: null,
}

export default function configureStore(initialState = initialStatedefault) {
  const store = createStore(
    appReducer,
    initialState,
    applyMiddleware(thunk));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    })
  }

  return store;
}