import {
  RiGlobalLine,
  RiHome9Line,
  RiMap2Line,
  RiMenuLine,
  RiServiceBellLine,
} from "@remixicon/react";
import "./header.scss";
import Logo from "./Logo";
import { type MouseEvent, useState, memo } from "react";
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
// Definition of the array of all header elements
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
  // Create a case for each element
  const [activeSection, setActiveSection] = useState<string>("homes");
  const [visible, setVisible] = useState<string | null>(null);

  // Another function to switch the top menu states such as Home, Services, etc.
  const handleClickMenu = (e: MouseEvent<HTMLAnchorElement>, label: string) => {
    e.preventDefault();
    setActiveSection(label);
  };
  // A function to change the state of items in the list and a language button.
  const handleMainClick = (e: React.MouseEvent, labal: string) => {
    e.stopPropagation();
    setVisible((prev) => (prev === labal ? null : labal));
  };

  // const global = visible && visible == "global" ? "global" : "";

  // console.log(global);

  return (
    <header className="header">
      <div className="header_container">
        {/* Website logo */}
        <div className="logo">
          <Logo />
        </div>

        {listHeaderIcons.map((item) => {
          return (
            <div
              key={item.type}
              className={`${item.type} ${item.type === "list" ? activeSection : ""}`}>
              {/* Check if the house and services list is correct. */}
              {/* Mid-Sections - Home Menu */}
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
              {/* User interface elements: Languages ​​button and Main menu button */}
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
