import {
  RiGlobalLine,
  RiHome9Line,
  RiMap2Line,
  RiMenuLine,
  RiServiceBellLine,
} from "@remixicon/react";
import "./header.scss";
import Logo from "./Logo";
import { type MouseEvent, useState, memo, useRef } from "react";
import Search from "./Search";
import Dialog from "../../ui/Dialog/Dialog";
import { useScrollVisibility } from "../../../hook/useScrollVisibility";

interface Labels {
  label: string;
  icon?: React.ReactNode;
}

interface HeaderIconItem {
  type: "menu" | "list";
  labels?: Labels[];
  icons?: React.ReactNode[];
}

const listHeaderIcons: HeaderIconItem[] = [
  {
    type: "list",
    labels: [
      { label: "Homes", icon: <RiHome9Line /> },
      { label: "Experiences", icon: <RiMap2Line /> },
      { label: "Services", icon: <RiServiceBellLine /> },
    ],
  },
  {
    type: "menu",
    labels: [
      { label: "global", icon: <RiGlobalLine /> },
      { label: "menu", icon: <RiMenuLine /> },
    ],
  },
];

/* Header component */
const Header = () => {
  const [activeSection, setActiveSection] = useState<string>("homes");
  const [visible, setVisible] = useState<string | null>(null);
  
  // 1. تصحيح نوع الـ Ref للـ Header
  const ref = useRef<HTMLDivElement | null>(null);

  // 2. إلغاء السيلكتور الخاطئ لكي يراقب الـ Header نفسه مباشرة
  useScrollVisibility(ref, undefined, { threshold: 0.1, triggerOnce: false });

  const handleClickMenu = (e: MouseEvent<HTMLAnchorElement>, label: string) => {
    e.preventDefault();
    setActiveSection(label);
  };

  const handleMainClick = (e: React.MouseEvent, label: string) => {
    e.stopPropagation();
    setVisible((prev) => (prev === label ? null : label));
  };

  return (
    <header   className="header">
      <div ref={ref} className="header_container">
        {/* Website logo */}
        <div className="logo">
          <Logo />
        </div>

        {listHeaderIcons.map((item) => {
          return (
            <div
              key={item.type}
              className={`${item.type} ${item.type === "list" ? activeSection : ""}`}
            >
              {/* Mid-Sections - Home Menu */}
              {item.type === "list" && item.labels && (
                <ul>
                  {item.labels.map((label) => (
                    <li key={label.label}>
                      <a
                        onClick={(e) => handleClickMenu(e, label.label.toLowerCase())}
                        href="#"
                      >
                        {label.icon}
                        {label.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {/* User interface elements */}
              {item.type === "menu" && item.labels && (
                <>
                  {item.labels.map((icon) => (
                    <div
                      onClick={(e) => handleMainClick(e, icon.label)}
                      className="translate-last"
                      key={icon.label}
                    >
                      {icon.icon}
                    </div>
                  ))}
                </>
              )}
            </div>
          );
        })}

        {/* Dialog Menus */}
        <Dialog
          className={`drop-down-${!visible ? "" : visible}`}
          visible={visible}
          setVisible={setVisible}
        />
      </div>

      {/* Search component */}
      <Search visible={!!visible} />
    </header>
  );
};

export default memo(Header);