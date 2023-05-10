import React from "react";

interface IMaterialButtonProps {
  handleClick?: () => void;
  icon?: string;
  text?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const MaterialButton = ({
  handleClick,
  text,
  className,
  style,
  icon,
}: IMaterialButtonProps) => {
  return (
    <div className={className} onClick={handleClick}>
      <span className={icon ? "material-icons-round" : ""} style={style}>
        {icon || text}
      </span>
    </div>
  );
};
