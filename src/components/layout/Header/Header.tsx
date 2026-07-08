import {
  RiGlobalLine,
  RiHome9Line,
  RiMap2Line,
  RiMenuLine,
  RiServiceBellLine,
} from "@remixicon/react";
import "./header.scss";
import Logo from "./Logo";
import { type MouseEvent, useState } from "react";
import Search from "./Search";
import Dialog from "../../ui/Dialog/Dialog";


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

const Header = () => {
  const [activeSection, setActiveSection] = useState<string>("homes");
  const [visible, setVisible] = useState<string | null>(null); // تحديد النوع كـ string أو null فقط
  
  const handleMainClick = (e: React.MouseEvent, labal: string) => {
    e.stopPropagation();
    setVisible((prev) => (prev === labal ? null : labal));
  };

  const labalFind = listHeaderIcons[1].labels?.find(
    (prev) => prev.label === visible,
  );



  
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
              key={item.type}
              className={`${item.type} ${item.type === "list" ? activeSection : ""}`}>
              {item.type === "list" && item.labels && (
                <ul>
                  {item.labels.map((label, ind) => (
                    <li key={ind}>
                      <a
                        onClick={(e: MouseEvent<HTMLAnchorElement>) =>
                          handleClickMenu(e, label.label.toLowerCase())
                        }
                        href="">
                        {label.icon}
                        {label.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {item.type === "menu" && item.labels && (
                <>
                  {item.labels.map((icon, i) => (
                    <div
                      onClick={(e) => handleMainClick(e, icon.label)}
                      className="translate-last"
                      key={i}>
                      {icon.icon}
                    </div>
                  ))}
                </>
              )}
            </div>
          );
        })}
        <Dialog
          className={`drop-down-${!visible ? "" : visible} ${labalFind ? "visible" : ""}`}
          visible={visible}
          setVisible={setVisible}
        />
      </div>
      <Search visible={!!visible}/>
      
    </header>
  );
};

export default Header;
