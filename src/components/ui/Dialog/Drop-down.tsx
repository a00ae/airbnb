import React, { memo } from "react";
import "./drop-down.scss";
type Props = {
  className: string;
  children: React.ReactNode;
};
const DropDown = (props: Props) => {
  
  const dropDownClassName = props.className.toLowerCase().trim();
  return (
    <div
      style={{
        position: "absolute",
        width: "620px",
        height: "430px",
        backgroundColor: "white",
        top: "110%",
        zIndex: 3,
        borderRadius: 40,
        boxShadow: "0 0 10px -3px rgba(0 0 0 / 0.5 )",
      }}
      className={`drop-down ${dropDownClassName || ""}`}>{props.children}</div>
  );
};

export default memo(DropDown);
