import { API_CARS, API_CREATE_ORDER } from '../constants/api';
import { ERequestType, IResponse, ICar } from '../constants/types';
import { EStoreActions } from './store.types';

function loadData(url: string, dispatch, params?: RequestInit) {
  return fetch(url, {
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    ...params
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((error) => {
      dispatch({ type: EStoreActions.SET_ERROR, payload: error });
    })
}

export function itemsIsLoading(isLoading: boolean) {
  return {
      type: EStoreActions.ITEMS_IS_LOADING,
      payload: isLoading
  };
}

export function getCars(data) {
  return (dispatch) => {
    const url = API_CARS;
    
    dispatch(itemsIsLoading(true));
    loadData(url, {
      method: ERequestType.GET,
      body: JSON.stringify(data),
    })
      .then((res: IResponse<{crews_info: ICar[]}>) => {
        dispatch({ type: EStoreActions.GET_CARS, payload: res.data.crews_info });
        dispatch(itemsIsLoading(false));
      })
  };  
}

export function updateAddress(address: string) {
  return (dispatch) => {
    dispatch({ type: EStoreActions.UPDATE_ADDRESS, payload: address });
  };  
}