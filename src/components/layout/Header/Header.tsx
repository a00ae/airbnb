import { RiGlobalLine, RiMenuLine } from "@remixicon/react";
import "./header.scss";
import Logo from "./Logo";

// 1. تصحيح الكلمات الإملائية في الواجهة
interface HeaderIconItem {
  type: "menu" | "list";
  labels?: string[];
  icons?: React.ReactNode[];
}

// 2. تعديل البيانات وتصحيح التسميات
const listHeaderIcons: HeaderIconItem[] = [
  {
    type: "list",
    labels: ["Homes", "Experiences", "Services"],
  },
  {
    type: "menu",
    icons: [<RiGlobalLine />, <RiMenuLine />],
  },
];

const Header = () => {
  return (
    <header className="header">
      <div className="header_container">
        <div className="logo">
          <Logo />
        </div>

        {listHeaderIcons.map((item) => (
          <div key={item.type} className={item.type}>
            {item.type === "list" && (
              <>
                {item.labels && (
                  <ul>
                    {item.labels.map((label, ind) => (
                      <li key={ind}><a href="">{label}</a></li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {item.type === "menu" && (
              <>
                {item.icons &&
                  item.icons.map((icon, i) => <div key={i}>{icon}</div>)}
              </>
            )}
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
