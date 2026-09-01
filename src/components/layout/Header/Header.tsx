import {
  RiGlobalLine,
  RiHome9Line,
  RiMap2Line,
  RiMenuLine,
  RiMoonLine,
  RiServiceBellLine,
} from "@remixicon/react";
import "./header.scss";
import Logo from "./Logo";
import { type MouseEvent, useState, memo, useRef } from "react";
import Search from "./Search";
import Menu from "./components/Menu";
import DropDown from "../../ui/Card/Drop-Down/Drop-down";
import DilogCard from "../../ui/Dialog/DilogCard";
import { menu } from "../../ui/Card/Drop-Down";
import MenuCard from "../../ui/Card/MenuCard";
import { useOnclickOutSide } from "../../../hook/useOnclickOutSide";

interface Labels {
  label: string;
  icon: React.ReactNode;
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
      { label: "mode", icon: <RiMoonLine /> },
      { label: "global", icon: <RiGlobalLine /> },
      { label: "menu", icon: <RiMenuLine /> },
    ],
  },
];

/* Header component */
const Header = () => {
  const [activeSection, setActiveSection] = useState<string>("homes");
  const [visible, setVisible] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);



  const handleClose = () => {
    setVisible(null);
  };

  // 2. إلغاء السيلكتور الخاطئ لكي يراقب الـ Header نفسه مباشرة

  useOnclickOutSide({
    ref: headerRef,
    handleDocumentClick: handleClose,
    visible: !!visible,
  });

  const handleClickMenu = (e: MouseEvent<HTMLAnchorElement>, label: string) => {
    e.preventDefault();
    setActiveSection(label);
  };
  return (
    <header ref={headerRef} className="header">
      <div  className="header_container">
        {/* Website logo */}
        <div className="logo">
          <Logo />
        </div>

        {listHeaderIcons.map((item) => {
          return (
            <div
              key={item.type}
              className={`${item.type} ${item.type === "list" ? activeSection : ""}`}>
              {/* Mid-Sections - Home Menu */}
              {item.type === "list" && item.labels && (
                <ul>
                  {item.labels.map((label) => (
                    <li key={label.label}>
                      <a
                        onClick={(e) =>
                          handleClickMenu(e, label.label.toLowerCase())
                        }
                        href="#">
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
                  {item.labels.map((item) => (
                    <Menu
                      item={item}
                      key={item.label}
                      Action={{ visible, setVisible }}
                    />
                  ))}
                </>
              )}
            </div>
          );
        })}

        {/* Dialog Menus */}

        <DilogCard
          className={`global ${visible === "global" ? "active" : ""}`}
          visible={visible === "global"}
          setVisible={setVisible}
        />

        <DropDown
          className={`menu-list ${visible === "menu" ? "is-active" : ""}`}>
          {menu.map((item, index) => (
            <MenuCard card={item} key={index} />
          ))}
        </DropDown>
      </div>

      {/* Search component */}
      <Search
        activeLabel={visible}
        onLabelChange={(label) => setVisible(label)}
      />
    </header>
  );
};

export default memo(Header);
