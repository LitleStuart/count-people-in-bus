import React from "react";

interface IMaterialButtonProps {
  handleClick?: () => void;
  icon?: string;
  text?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export const MaterialButton = ({
  handleClick,
  text,
  className,
  style,
  icon,
  disabled,
}: IMaterialButtonProps) => {
  return (
    <div className={className} onClick={disabled ? () => {} : handleClick}>
      <span className={icon ? "material-icons-round" : ""} style={style}>
        {icon || text}
      </span>
    </div>
  );
};
