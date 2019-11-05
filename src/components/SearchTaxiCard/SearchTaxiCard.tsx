import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Card from '../Card';
import Input from '../Input';
import Map from '../Map';
import SuitableCar from '../SuitableCar';
import { IStore } from '../../store/store.types';
import { updateAddress as updateStoreAddress, getCars } from '../../store/actions';
import { debounce } from 'lodash';

const cn = 'search-taxi-card';

const SearchTaxiCard: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const address = useSelector((state: IStore) => state.address);

  useEffect(() => {
    dispatch(getCars(address))
  }, [address])

  const updateAddress = debounce((value: string) => {
    dispatch(updateStoreAddress(value));
  }, 1000);

  return (
    <Card>
      <h1 className={ `${cn}-title` }>Детали заказа</h1>
      <Input 
        label={ 'Откуда: ' }
        value={ address }
        onChange={ (event: React.ChangeEvent<HTMLInputElement>) => updateAddress(event.target.value) }
      />
      <SuitableCar />
      <Map />
    </Card>
  );
}

export default SearchTaxiCard;