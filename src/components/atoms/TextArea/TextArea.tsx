import React, { forwardRef } from "react";
import "./TextArea.css";

interface TextAreaProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
  ref?: React.Ref<HTMLTextAreaElement>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export const TextArea: React.FC<TextAreaProps> = forwardRef<
  HTMLTextAreaElement,
  TextAreaProps
>(
  (
    { value, onChange, placeholder = "", className = "", rows = 4, onKeyDown },
    ref
  ) => (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`textarea ${className}`}
      rows={rows}
      onKeyDown={onKeyDown}
    />
  )
);
