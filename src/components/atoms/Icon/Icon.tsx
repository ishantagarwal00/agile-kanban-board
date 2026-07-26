import React from "react";
import "./Icon.css";

interface IconProps {
  name: "plus" | "edit" | "delete" | "close" | "drag" | "comment";
  title?: string;
  className?: string;
  onClick?: () => void;
}

const SvgWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
  >
    {children}
  </svg>
);

const P = (d: string) => (
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d} />
);

export const Icon: React.FC<IconProps> = ({
  name,
  onClick,
  className = "",
  ...rest
}) => {
  const icons: Record<string, React.ReactNode> = {
    plus: <SvgWrapper>{P("M5 12h14m-7 7V5")}</SvgWrapper>,
    edit: (
      <SvgWrapper>
        {P("m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z")}
      </SvgWrapper>
    ),
    delete: (
      <SvgWrapper>
        {P("M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z")}
      </SvgWrapper>
    ),
    close: <SvgWrapper>{P("M6 18 17.94 6M18 18 6.06 6")}</SvgWrapper>,
    drag: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M11 18a2 2 0 11-4 0 2 2 0 014 0zm0-8a2 2 0 11-4 0 2 2 0 014 0zm0-6a2 2 0 11-4 0 2 2 0 014 0zm6 4a2 2 0 11-4 0 2 2 0 014 0zm0 2a2 2 0 11-4 0 2 2 0 014 0zm0 6a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    comment: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
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
      aria-label={name}
      {...rest}
    >
      {icons[name]}
    </span>
  );
};
