import React from "react";
import "./Input.css";

interface InputProps {
  value: string;
  name: string;
  ref?: React.RefObject<HTMLInputElement | null>;
  onChange: (val: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export const Input: React.FC<InputProps> = ({
  name = "",
  value,
  ref = null,
  onChange,
  onKeyDown,
  onBlur,
  placeholder = "",
  className = "",
  autoFocus = false,
}) => (
  <input
    ref={ref}
    name={name}
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={(e) => onKeyDown && onKeyDown(e)}
    onBlur={() => onBlur && onBlur()}
    placeholder={placeholder}
    className={`input ${className}`}
    autoFocus={autoFocus}
  />
);
