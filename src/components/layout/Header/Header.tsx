import { RiGlobalLine, RiHome9Line, RiMap2Line, RiMenuLine, RiServiceBellLine } from "@remixicon/react";
import "./header.scss";
import Logo from "./Logo";
import { type MouseEventHandler, type MouseEvent, useRef, useState } from "react";
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
        icon:  <RiMap2Line />,
      },
      {
        labal: "Services",
        icon: <RiServiceBellLine />,
      },
    ],
  },
  {
    type: "menu",
    icons: [<RiGlobalLine />, <RiMenuLine />],
  },
];

const Header = () => {
  const [activeSection, setActiveSection ] = useState<string>("homes");

  const handleClickMenu = (e: MouseEvent<HTMLAnchorElement>, label: string) => {
    e.preventDefault();
    setActiveSection(label);
  }
  return (
    <header className="header">
      <div className="header_container">
        <div className="logo">
          <Logo />
        </div>

        {listHeaderIcons.map((item) => (
          <div  key={item.type} className={`${item.type} ${item.type == "list"  ? activeSection : ""}`}>
            {item.type === "list" && (
              <>
                {item.labels && (
                  <ul>
                    {item.labels.map((label, ind) => (
                      <li key={ind}>
                        <a onClick={(e: MouseEvent<HTMLAnchorElement>) => handleClickMenu(e, label.labal.toLowerCase())} href="">
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
                {item.icons &&
                  item.icons.map((icon, i) => <div className="translate-last" key={i}>{icon}</div>)}
              </>
            )}
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
