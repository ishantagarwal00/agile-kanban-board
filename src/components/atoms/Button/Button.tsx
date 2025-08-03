import React from "react";
import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = "",
  variant = "button",
}) => (
  <button
    type={variant}
    onClick={onClick}
    disabled={disabled}
    className={`btn ${className}`}
  >
    {children}
  </button>
);
