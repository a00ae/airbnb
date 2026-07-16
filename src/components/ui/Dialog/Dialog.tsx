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

interface MenuList {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  titles?: string[];
}

const menu: MenuList[] = [
  {
    icon: <RiQuestionLine />,
    title: "help center",
  },
  {
    title: "become a host",
    description: "it's easy to start hosting and earn extra income",
  },
  {
    titles: ["rever a host", "find a co-host", "gift cards"],
  },
  {
    title: "log in or sign up",
  },
];
// من اجل الصيانة
// مكون فرعي مستقل ومسهل للصيانة
const MenuCard: React.FC<{ card: MenuList }> = ({ card }) => {
  // الحالة الأولى: عنوان وأيقونة
  if (card.title && card.icon) {
    return (
      <div className="menu_btn icon">
        {card.icon}
        <span data-title>{card.title}</span>
      </div>
    );
  }

  // الحالة الثانية: عنوان ووصف
  if (card.title && card.description) {
    // تعديل إملائي بسيط لـ description
    return (
      <div className="menu_btn description">
        <span data-title>{card.title}</span>
        <span data-description>{card.description}</span>
      </div>
    );
  }

  // الحالة الثالثة: قائمة عناوين فرعية
  if (card.titles) {
    return (
      <div className="menu_btn titles">
        {card.titles.map((item) => (
          <div key={item} className="item-btn">
            <span>{item}</span>
          </div>
        ))}
      </div>
    );
  }

  // الحالة الرابعة: عنوان فقط
  if (card.title) {
    return (
      <div className="menu_btn log-in">
        <span>{card.title}</span>
      </div>
    );
  }

  // في حال لم يطابق أي شرط
  return null;
};

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
        {visible == "menu" && (
          <>
            {menu.map((card, index) => (
              <MenuCard key={index} card={card} />
            ))}
          </>
        )}
        {children}
      </div>
    </div>
  );
};

export default Dialog;
