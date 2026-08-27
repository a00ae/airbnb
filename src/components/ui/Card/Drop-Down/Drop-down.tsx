import React, { memo, forwardRef } from "react";
import "./drop-down.scss";

type Props = {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};



const DropDown = forwardRef<HTMLDivElement, Props>(({ className = "", children, style }, ref) => {

 const customClass = className.toLowerCase().trim();
  const combinedClasses = `drop-down ${customClass}`.trim();

  return (
    <div ref={ref} style={style} className={combinedClasses}>
      {children}
    </div>
  );
});

DropDown.displayName = "DropDown";

export default memo(DropDown);