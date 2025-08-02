import React from "react";
import "./Typography.css";

interface TypographyProps {
  children: React.ReactNode;
  variant?: "h2" | "h3" | "body";
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = "body",
  className = "",
}) => {
  const tag = variant === "h2" ? "h2" : variant === "h3" ? "h3" : "p";
  return React.createElement(
    tag,
    { className: `typography typography--${variant} ${className}` },
    children
  );
};
