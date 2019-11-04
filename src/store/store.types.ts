import { IError, ICar } from "../constants/types";

export enum EStoreActions {
  GET_CARS = 'GET_CARS',
  ITEMS_IS_LOADING = 'ITEMS_IS_LOADING',
  SET_ERROR = 'SET_ERROR',
  UPDATE_ADDRESS = 'UPDATE_ADDRESS',
}

export interface IStore {
  address: string;
  errors: IError;
  isLoading: boolean;
  cars: ICar[];
}

export interface IStoreAction {
  type: EStoreActions;
  payload: any;
}