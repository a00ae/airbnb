import {
  RiGlobalLine,
  RiHome9Line,
  RiMap2Line,
  RiMenuLine,
  RiServiceBellLine,
} from "@remixicon/react";
import "./header.scss";
import Logo from "./Logo";
import { type MouseEvent, useRef, useState } from "react";
import Search from "./Search";

interface Labels {
  labal: string;
  icon?: React.ReactNode;
}
// 1. تصحيح الكلمات الإملائية في الواجهة
interface HeaderIconItem {
  type: "menu" | "list";
  labels?: Labels[];
  icons?: React.ReactNode[];
}

// 2. تعديل البيانات وتصحيح التسميات
const listHeaderIcons: HeaderIconItem[] = [
  {
    type: "list",
    labels: [
      {
        labal: "Homes",
        icon: <RiHome9Line />,
      },
      {
        labal: "Experiences",
        icon: <RiMap2Line />,
      },
      {
        labal: "Services",
        icon: <RiServiceBellLine />,
      },
    ],
  },
  {
    type: "menu",
    labels: [
      {
        labal: "global",
        icon: <RiGlobalLine />,
      },
      {
        labal: "menu",
        icon: <RiMenuLine />,
      },
    ],
    // icons: [<RiGlobalLine />, ],
  },
];

const Header = () => {
  const [activeSection, setActiveSection] = useState<string>("homes");
  const [visible, setVisible] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMainClick = (labal: string) => {
    setVisible((prev) => (prev === labal ? null : labal));
  };

  const handleClickMenu = (e: MouseEvent<HTMLAnchorElement>, label: string) => {
    e.preventDefault();
    setActiveSection(label);
  };
  return (
    <header className="header">
      <div className="header_container">
        <div className="logo">
          <Logo />
        </div>

        {listHeaderIcons.map((item) => {
          return (
            <div
              ref={ref}
              key={item.type}
              className={`${item.type} ${item.type == "list" ? activeSection : ""}`}>
              {item.type === "list" && (
                <>
                  {item.labels && (
                    <ul>
                      {item.labels.map((label, ind) => (
                        <li key={ind}>
                          <a
                            onClick={(e: MouseEvent<HTMLAnchorElement>) =>
                              handleClickMenu(e, label.labal.toLowerCase())
                            }
                            href="">
                            {label.icon}
                            {label.labal}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}

              {item.type === "menu" && (
                <>
                  {item.labels &&
                    item.labels.map((icon, i) => {
                      const isCurrentActive: boolean = visible === icon.labal
                       return (
                        <div
                          onClick={() => handleMainClick(icon.labal)}
                          className="translate-last"
                          key={i}>
                          {icon.icon}
                          <div
                            className={`drop-down-${icon.labal} ${isCurrentActive ? "visible" : ""}`}></div>
                        </div>
                      );
                    })}
                </>
              )}
            </div>
          );
        })}
      </div>
      <Search />
    </header>
  );
};

export default Header;
