import { IError, EError } from "../constants/types";

export const validateAddress = (address: string): boolean => {
  return /^[А-Я]*[а-я]+, [0-9]+[А-Я]*[а-я]*$/.test(address);
}

export const getErrorString = (error: IError): string => {
  if (!error) return '';
  
  switch (error.type) {
    case EError.validationError:
      return 'Неверный адрес';
    case EError.responseError:
      return 'Ошибка запроса';
    default:
      return '';
  }
}