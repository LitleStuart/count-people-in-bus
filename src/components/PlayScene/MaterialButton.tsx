import React from "react";

interface IMaterialButtonProps {
  handleClick: () => void;
  text: string;
  className: string;
  style?: React.CSSProperties;
}

export const MaterialButton = ({
  handleClick,
  text,
  className,
  style,
}: IMaterialButtonProps) => {
  return (
    <div className={className} onClick={handleClick} style={style}>
      <span className="material-icons-round">{text}</span>
    </div>
  );
};
