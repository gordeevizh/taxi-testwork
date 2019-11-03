import React from 'react';
import { EInputType, IInputProps } from './Input.types';

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
        value={ value || '' }
        onBlur={ onBlur }
        onChange={ onChange }
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