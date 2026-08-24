import React, { memo } from "react";
import "./drop-down.scss";
type Props = {
  className: string;
  children?: React.ReactNode;
  width?: number;
  height?:  number;
};
const DropDown = ({className, children, height = 430 ,width = 620}: Props) => {
  
  const dropDownClassName = className.toLowerCase().trim();
  return (
    <div
      style={{
        position: "absolute",
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: "var(--card-bg)",
        top: "110%",
        zIndex: 3,
        borderRadius: 40,
        boxShadow: "0 0 10px -3px rgba(0 0 0 / 0.5 )",
      }}
      className={`drop-down ${dropDownClassName || ""}`}>{children}</div>
  );
};

export default memo(DropDown);
