// components/Menu.tsx
import { type ReactNode, type MouseEvent } from "react";

export type MenuProps = {
  label: string;
  icon: ReactNode;
};

interface SetAction {
  visible: string | null;
  setVisible: React.Dispatch<React.SetStateAction<string | null>>;
}

const Menu = ({ item, Action }: { item: MenuProps; Action: SetAction }) => {
  const handleClickMenu = (e: MouseEvent, label: string) => {
    e.stopPropagation(); // منع انتشار الحدث لعدم إغلاق القائمة بالخطأ
    
    if (label === "mode") {
      document.body.classList.toggle("dark");
      return;
    }
    Action.setVisible((prev) => (prev === label ? null : label));
  };

  return (
    <div
      onClick={(e) => handleClickMenu(e, item.label)}
      className="translate-last"
    >
      {item.icon}
    </div>
  );
};

export default Menu;