import { memo, useEffect, useRef } from "react";
import { useOnclickOutSide } from "../../../hook/useOnclickOutSide";
import GlobalLanguage from "./GlobalLanguage";
import "./dialog.scss"

type DialogProps = {
  className: string;
  visible:  boolean;
  setVisible: React.Dispatch<React.SetStateAction<string | null>>
};

const DilogCard = ({ className, visible, setVisible }: DialogProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
      const backdropRef = useRef<HTMLDivElement | null>(null);
    
      const handleClose = () => {
        setVisible(null);
      };
    
      useEffect(() => {
        if (visible && backdropRef.current) {
          backdropRef.current.focus();
        }
      }, [visible]);
    
      const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape") {
          handleClose();
        }
      };
    
      useOnclickOutSide({
        ref,
        handleDocumentClick: handleClose,
        visible: !!visible,
      });




  return (
    <div
    ref={backdropRef}
    tabIndex={0}
    onKeyDown={handleKeyDown}
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0d0b0b24",
        opacity: visible ? 1 : 0,
        visibility: visible ? "visible" : "hidden",
        zIndex: 999,
      }}>
      <div ref={ref} className={className}>


        <GlobalLanguage close={handleClose} />
      </div>
    </div>
  );
};

export default memo(DilogCard);
