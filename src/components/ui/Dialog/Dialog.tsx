import React, { useRef, useEffect } from "react";
import { useOnclickOutSide } from "../../../hook/useOnclickOutSide";
import GlobalLanguage from "../Card/Drop-Down/GlobalLanguage";
import { RiQuestionLine } from "@remixicon/react";

type Props = {
  className?: string;
  visible?: string | null;
  setVisible: (visible: string | null) => void;
  children?: React.ReactNode;
};

const menu: {
  icon?: React.ReactNode;
  title?: string;
  descraption?: string;
  titles?: string[];
}[] = [
  {
    icon: <RiQuestionLine />,
    title: "help center",
  },
  {
    title: "become a host",
    descraption: "it's easy to start hosting and earn extra income",
  },
  {
    titles: ["rever a host", "find a co-host", "gift cards"],
  },
  {
    title: "log in or sign up",
  },
];
// من اجل الصيانة 
const element = menu.map((card, index) => {

  if(card.title &&  card.icon)
    return (
      <div key={index}>
          {card.icon}
          <span data-title> {card.title}</span>
      </div>
    );
  if(card.title && card.descraption) 
    return (
      <div key={index}>
          <span data-title>{card.title}</span>
          <span data-descraption>{card.descraption}</span>
      </div>
    );
  if(card.titles) 
   return card.titles.map((ele, index) => (
    <div key={index}>
      <span>{ele}</span>
    </div>
  ))
  if(card.title) 
    return (
      <div key={index}>
        <span>{card.title}</span>
      </div>
    )

});

const Dialog = ({ className, visible, setVisible, children }: Props) => {
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
      }}>
      <div
        ref={ref}
        className={`dialog ${className || ""}`}
        style={{ backdropFilter: "blur(3px)" }} // Better way to blur just the background
      >
        {visible == "global" && <GlobalLanguage close={handleClose} />}
        {visible == "menu" && <>
        {element}
        </>}
        {children}
      </div>
    </div>
  );
};

export default Dialog;
