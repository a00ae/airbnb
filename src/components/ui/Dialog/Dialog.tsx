import { useRef, useEffect } from "react";
import { useOnclickOutSide } from "../../../hook/useOnclickOutSide";

type Props = {
  className?: string;
  visible?: string | null;
  setVisible: (visible: string | null) => void;
};

const Dialog = ({ className, visible, setVisible }: Props) => {
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
      tabIndex={0} // Changed to 0 so it's programmatically and naturally focusable
      onKeyDown={handleKeyDown} // onKeyDown feels snappier for dialog closures than onKeyUp
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
      }}
    >
      <div 
        ref={ref} 
        className={`dialog ${className || ""}`}
        style={{ backdropFilter: "blur(3px)" }} // Better way to blur just the background
      >
      </div>
    </div>
  );
};

export default Dialog;