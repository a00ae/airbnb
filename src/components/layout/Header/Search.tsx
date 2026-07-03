import { RiSearchLine } from "@remixicon/react";
import { itemButtonSearch } from "./index";
import "./search.scss";
import { useEffect, useRef, useState } from "react";



const Search = () => {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

    const ref = useRef<HTMLDivElement | null>(null);

    const handleDocumentClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setActiveLabel(null);
      }
    };

    useEffect(() => {
      if (activeLabel) window.addEventListener("click", handleDocumentClick);
      return () => {
        window.removeEventListener("click", handleDocumentClick);
      };
    }, [activeLabel]);
  

  const handleClickSearch = (label: string) => {
    setActiveLabel((prev) => (prev === label ? null : label));
  };
  if (!ref) return null;

  return (
    <div ref={ref} className="search">
      {itemButtonSearch.map(({ descraption, title }) => {
        const currentTitleLower:string = title.trim().toLowerCase();
        const isCurrentActive:boolean = activeLabel === title;

        return (
          <div
            onClick={() => handleClickSearch(title)}
            key={title}
            className={`search_btn ${currentTitleLower}`}
          >
            <p>{title}</p>
            <span>{descraption}</span>
            
            {title === "Who" && (
              <div className="search_icon">
                <RiSearchLine />
              </div>
            )}

            <div className={`last-${currentTitleLower} ${isCurrentActive ? "visible" : ""}`}>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Search;