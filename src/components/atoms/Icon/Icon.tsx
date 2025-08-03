import React from "react";
import "./Icon.css";

interface IconProps {
  name: "plus" | "edit" | "delete" | "close" | "drag" | "comment";
  title?: string;
  className?: string;
  onClick?: () => void;
}

export const Icon: React.FC<IconProps> = ({
  name,
  onClick,
  className = "",
}) => {
  const icons: Record<string, React.ReactNode> = {
    plus: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H5a1 1 0 110-2h6V5a1 1 0 011-1z" />
      </svg>
    ),
    edit: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
        <path d="M20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
      </svg>
    ),
    delete: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12z" />
        <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
      </svg>
    ),
    close: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
    ),
    drag: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M11 18a2 2 0 11-4 0 2 2 0 014 0zm0-8a2 2 0 11-4 0 2 2 0 014 0zm0-6a2 2 0 11-4 0 2 2 0 014 0zm6 4a2 2 0 11-4 0 2 2 0 014 0zm0 2a2 2 0 11-4 0 2 2 0 014 0zm0 6a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    comment: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.99 4c0-1.1-.89-2-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h14l4 4V4z" />
      </svg>
    ),
  };

  return (
    <span
      onClick={onClick}
      className={`icon ${onClick ? "icon--clickable" : ""} ${className}`}
      tabIndex={0}
      role="button"
    >
      {icons[name]}
    </span>
  );
};
