export enum EInputType {
  text = 'text',
  number = 'number'
}

export interface IInputProps {
  disabled?: boolean;
  error?: string;
  inputClass?: string;
  label?: string;
  name?: string;
  type?: EInputType;
  value?: string | number;

  onBlur?: (ev: React.FormEvent) => void;
  onFocus?: () => void;
  onKeyDown?: (ev: React.KeyboardEvent) => void;
  onChange?: (ev: React.ChangeEvent) => void;
}