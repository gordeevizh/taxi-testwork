import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Card from '../Card';
import Input from '../Input';
import Map from '../Map';
import SuitableCar from '../SuitableCar';
import { IStore } from '../../store/store.types';
import { updateAddress as updateStoreAddress, getCars, setErrors } from '../../store/actions';
import { debounce } from 'lodash';
import { validateAddress, getErrorString } from '../../utils/validation';
import { EFormFields, EError } from '../../constants/types';

const cn = 'search-taxi-card';

const SearchTaxiCard: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const address = useSelector((state: IStore) => state.address);
  const errors = useSelector((state: IStore) => state.errors);
  const [touched, setTouched] = useState<boolean>(false);
  const addressError = errors && errors.filter(error => error.field === EFormFields.address)[0];

  console.log(addressError)

  useEffect(() => {
    if (touched) {
      const formIsValid = formValidate();
  
      if (formIsValid) {
        dispatch(getCars(address));
      }
    }
  }, [address])

  const updateAddress = debounce((value: string) => {
    dispatch(updateStoreAddress(value));
  }, 1000);

  const formValidate = () => {
    const addressIsValid = validateAddress(address);

    if (!addressIsValid) {
      dispatch(setErrors([
        ...errors.filter(error => error.field !== EFormFields.address),
        {
          field: EFormFields.address,
          type: EError.validationError,
        }
      ]));
    }
    return addressIsValid;
  }

  const focusAddressHandler = () => {
    setTouched(true);
    dispatch(setErrors([
      ...errors.filter(error => error.field !== EFormFields.address),
    ]))
  }

  const keydownHandler = () => {
    if(errors.filter(error => error.field == EFormFields.address).length) {
      dispatch(setErrors([
        ...errors.filter(error => error.field !== EFormFields.address),
      ]))
    }
  }

  return (
    <Card>
      <h1 className={ `${cn}-title` }>Детали заказа</h1>
      <Input 
        label={ 'Откуда: ' }
        value={ address }
        error={ getErrorString(addressError) }
        onChange={ (event: React.ChangeEvent<HTMLInputElement>) => updateAddress(event.target.value) }
        onFocus={ focusAddressHandler }
        onKeyDown={ keydownHandler }
      />
      <SuitableCar />
      <Map />
    </Card>
  );
}

export default SearchTaxiCard;