import React, { useState, useEffect } from 'react';
import { EInputType, IInputProps } from './Input.types';

import './Input.styles.pcss';

const cn = 'input'

const Input: React.FunctionComponent<IInputProps> = (props: IInputProps) => {
  const { 
    disabled,
    error,
    inputClass,
    label,
    name,
    type,
    value,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
  } = props;
  const [localValue, setLocalValue] = useState<string | number>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value])

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };


  return (
    <label className={ cn }>
      { label && label.length && (
        <span className={ `${cn}__label ${error && `${cn}__label--error` }` }>
          { label }
        </span>
      ) }
      <input 
        className={ `${cn}__input ${inputClass} ${error && `${cn}__input--error` }` }
        disabled={ disabled }
        name={ name }
        type={ type || EInputType.text }
        value={ localValue || '' }
        onBlur={ onBlur }
        onChange={ changeHandler }
        onFocus={ onFocus }
        onKeyDown={ onKeyDown }
      />
      { error && error.length && (
        <span className={ `${cn}__error` }>
          { error }
        </span>
      ) }
    </label>
  )
}

export default Input;