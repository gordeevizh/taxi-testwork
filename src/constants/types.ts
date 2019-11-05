export enum ERequestType {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
}

export enum EResponseDescr {
  ok = 'OK',
  error = 'ERROR'
}

export enum EresponseErrorCode {
  notError = 0,
  notFound = 404,
  serverError = 500,
}

export enum EError {
  'validationError',
  'responseError',
}

export enum EFormFields {
  'address'
}

export enum ECarMarks {
  hyundai = 'Hyundai',
  renault = 'Renault',
  kie = 'Kia',
  lada = 'Лада',
}

export enum ECarModels {
  solaris = 'Solaris',
  logan = 'Logan',
  chetirka = 'Четырка',
  optima = 'Optima',
}

export enum ECarColors {
  blue = 'синий',
  white = 'белый',
  red = 'красный',
  green = 'зеленый',
}

export interface IResponse<T> {
  code: EresponseErrorCode,
  descr: EResponseDescr,
  data: T,
}

export interface IError {
  type: EError;
  field: EFormFields;
}

export interface ICar {
  crew_id: number;
  car_mark: ECarMarks;
  car_model: ECarModels;
  car_color: ECarColors;
  car_number: string;
  driver_name: string;
  driver_phone: number;
  lat: number;
  lon: number;
  distance: number;
}

declare global {
  interface Window {
    ymaps: any;
  }
}