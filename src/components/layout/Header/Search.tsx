import { RiSearchLine } from "@remixicon/react";
import { itemButtonSearch } from "./index";
import "./search.scss";
import { useRef, useState } from "react";
import { useOnclickOutSide } from "../../../hook/useOnclickOutSide";

const Search = () => {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  const ref = useRef<HTMLDivElement | null>(null);

  const handleClicOutSide = () => {
    setActiveLabel(null);
  };

  useOnclickOutSide({
    ref: ref,
    handleDocumentClick: handleClicOutSide,
    visible: activeLabel,
  });

  const handleClickSearch = (label: string) => {
    setActiveLabel((prev) => (prev === label ? null : label));
  };

  return (
    <div ref={ref} className="search">
      {itemButtonSearch.map(({ descraption, title }) => {
        const currentTitleLower: string = title.trim().toLowerCase();
        const isCurrentActive: boolean = activeLabel === title;

        return (
          <div
            onClick={() => handleClickSearch(title)}
            key={title}
            className={`search_btn ${currentTitleLower} ${isCurrentActive ? "visible" : ""}`}>
            <p>{title}</p>
            <span>{descraption}</span>

            {title === "Who" && (
              <div className="search_icon">
                <RiSearchLine />
              </div>
            )}

            <div
              className={`last-${currentTitleLower} ${isCurrentActive ? "visible" : ""}`}></div>
          </div>
        );
      })}

      <div className="search_input">
        <RiSearchLine/>
        <span data-search>Start yuor searh</span>
      </div>
    </div>
  );
};

export default Search;
