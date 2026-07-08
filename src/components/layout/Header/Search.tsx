import { RiSearchLine } from "@remixicon/react";
import { dataWhere, itemButtonSearch } from "./index";
import "./search.scss";
import { useRef, useState } from "react";
import { useOnclickOutSide } from "../../../hook/useOnclickOutSide";
import DropDown from "../../ui/Dialog/Drop-down";

const Search = () => {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [increment, setIncrement] = useState<number>(0);
  // const [active, setAcive] = useState<string | null>(null);
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

  if (!ref) return null;

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
          </div>
        );
      })}

      <div className="search_input">
        <RiSearchLine />
        <span data-search>Start yuor searh</span>
      </div>
      <DropDown className={!activeLabel ? "" : activeLabel}>
        {dataWhere
          .filter((item) => item.type === activeLabel?.toLowerCase().trim())
          .map((item, i) => {
            return (
              <div key={i} className={`child-${item.type}`}>
                {/* قسم الوجهات - Where */}
                {item.type === "where" && (
                  <>
                    <span>Suggested destinations</span>
                    {item.whereData?.map(
                      ({
                        id,
                        iconDataWhere,
                        titleDataWhere,
                        descraptionDataWhere,
                        bgColor,
                      }) => (
                        <div key={id} className="where_card-btn">
                          <div
                            style={{ backgroundColor: bgColor }}
                            className="svg">
                            {iconDataWhere}
                          </div>
                          <div className="card_descraption">
                            <span>{titleDataWhere}</span>
                            <p>{descraptionDataWhere}</p>
                          </div>
                        </div>
                      ),
                    )}
                  </>
                )}

                {/* قسم الأشخاص - Who */}
                {item.type === "who" && (
                  <>
                    {item.whoData?.map((who, index) => (
                      <div key={index} className="who_card-btn">
                        <div className="who-descraption">
                          <span>{who.titleDataWho}</span>
                          <p>{who.descraptionDataWho}</p>
                        </div>
                        <div className="who-number">
                          <span
                            onClick={() => setIncrement(increment - 1)}
                            className="discriment">
                            —
                          </span>
                          <span className="valued">{increment}</span>
                          <span
                            onClick={() => setIncrement(increment + 1)}
                            className="increment">
                            +
                          </span>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            );
          })}
      </DropDown>
    </div>
  );
};

export default Search;
