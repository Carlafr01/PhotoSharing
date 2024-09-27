import React from 'react';
import './Input.scss';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
  accept?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder = '',
  value,
  onChange,
  type = 'text',
  disabled = false,
  accept,
}) => {
  return (
    <div className="input-default-wrapper">
      {label && <label className="input-label">{label}</label>}
      <input
        className="input-default"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        accept={accept}
      />
    </div>
  );
};

export default Input;
