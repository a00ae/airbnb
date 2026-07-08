import { RiSearchLine } from "@remixicon/react";
import { dataWhere, itemButtonSearch } from "./index";
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

            <div className={`last-${currentTitleLower} ${isCurrentActive ? "visible" : ""}`}>
  {dataWhere
    // 1. نقوم بفلترة المصفوفة أولاً لنجلب فقط العنصر الذي يطابق التبويب الحالي
    .filter((item) => item.type === currentTitleLower)
    // 2. الآن نعمل map على العنصر المطابق فقط (سينتج عنصر واحد دائماً)
    .map((item, i) => {
      return (
        <div key={i} className={`child-${item.type}`}>
          
          {/* قسم الوجهات - Where */}
          {item.type === "where" && (
            <>
              <span>Suggested destinations</span>
              {item.whereData?.map(({ id, iconDataWhere, titleDataWhere, descraptionDataWhere, bgColor }) => (
                <div key={id} className="where_card-btn">
                  <div style={{ backgroundColor: bgColor }} className="svg">
                    {iconDataWhere}
                  </div>
                  <div className="card_descraption">
                    <span>{titleDataWhere}</span>
                    <p>{descraptionDataWhere}</p>
                  </div>
                </div>
              ))}
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
                  <div>
                    <div className="plas">+</div>
                    <span>0</span>
                    <div className="mnus">-</div>
                  </div>
                </div>
              ))}
            </>
          )}

        </div>
      );
    })}
</div>
          </div>
        );
      })}

      <div className="search_input">
        <RiSearchLine />
        <span data-search>Start yuor searh</span>
      </div>
    </div>
  );
};

export default Search;
