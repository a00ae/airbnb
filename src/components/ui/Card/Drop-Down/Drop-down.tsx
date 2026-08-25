import React, { memo } from "react";
import "./drop-down.scss";

type Props = {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

const DropDown = ({ className = "", children, style }: Props) => {
  return (
    <div style={style} className={`drop-down ${className.toLowerCase().trim()}`}>
      {children}
    </div>
  );
};

export default memo(DropDown);