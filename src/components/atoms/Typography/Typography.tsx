import React from "react";
import "./Typography.css";

interface TypographyProps {
  children: React.ReactNode;
  variant?: "h2" | "h3" | "body";
  className?: string;
  tabIndex?: number;
  title?: string;
  onDoubleClick?: () => void;
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLHeadingElement | HTMLParagraphElement>
  ) => void;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = "body",
  className = "",
  title = "",
  onDoubleClick,
  onKeyDown,
  tabIndex = -1,
  ...rest
}) => {
  const tag = variant === "h2" ? "h2" : variant === "h3" ? "h3" : "p";
  return React.createElement(
    tag,
    {
      className: `typography typography-${variant} ${className}`,
      tabIndex: tabIndex,
      title: title,
      onDoubleClick: onDoubleClick,
      onKeyDown: onKeyDown,
      ...rest,
    },
    children
  );
};
