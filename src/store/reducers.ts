import { combineReducers } from 'redux'
import {IStore, EStoreActions, IStoreAction } from './store.types';
import { IError, ICar } from '../constants/types';

function address(state: string = '', action: IStoreAction) {
  switch (action.type) {
    case EStoreActions.UPDATE_ADDRESS:
      return action.payload;
    default:
      return state;
  }
}

function isLoading(state: boolean = false, action: IStoreAction) {
  if (action.type === EStoreActions.ITEMS_IS_LOADING) {
    return action.payload;
  }
  return false;
}

function errors(state: IError = null, action: IStoreAction) {
  if (action.type === EStoreActions.SET_ERROR) {
    return action.payload;
  }
  return state;
}

function cars(state: ICar = null, action: IStoreAction) {
  switch (action.type) {
    case EStoreActions.GET_CARS:
      return action.payload || null;
    default:
      return state;
  }
}



const appReducer = combineReducers({
  isLoading,
  address,
  errors,
  cars,
})

export default appReducer;