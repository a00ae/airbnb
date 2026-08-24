import { RiSearchLine, RiMapPinLine } from "@remixicon/react";
import { dataWhere, itemButtonSearch, type DataSearchWho } from "./index";
import "./search.scss";
import { useEffect, useRef, useState, useMemo } from "react";
import { useOnclickOutSide } from "../../../hook/useOnclickOutSide";
import DropDown from "../../ui/Card/Drop-Down/Drop-down";
import { useApartments } from "../../../hook/useApartments";

type Props = {
  visible?: boolean;
};

// 1. Independent card component (contains its own counter)
const WhoCard = ({ who }: { who: DataSearchWho }) => {
  const [count, setCount] = useState(0);

  return (
    <div className="who_card-btn">
      <div className="who-descraption">
        <span>{who.titleDataWho}</span>
        <p>{who.descraptionDataWho}</p>
      </div>
      <div className="who-number">
        <span
          onClick={() => setCount((prev) => Math.max(0, prev - 1))}
          className="discriment">
          —
        </span>
        <span className="valued">{count}</span>
        <span
          onClick={() => setCount((prev) => prev + 1)}
          className="increment">
          +
        </span>
      </div>
    </div>
  );
};

/* Search Section Component */
const Search = ({ visible }: Props) => {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  // 🟢 جلب الفلاتر والمدن المتاحة من الهوك
  const { cities, filters, filteredApartments, isLoading, error, currentCurrency } = useApartments();
  const { selectedCity, setSelectedCity, searchQuery, setSearchQuery } = filters;
  

  // إغلاق الـ Dropdown عند الضغط بالخارج
  const handleClicOutSide = () => {
    setActiveLabel(null);
  };

  useOnclickOutSide({
    ref: ref,
    handleDocumentClick: handleClicOutSide,
    visible: activeLabel,
  });

  useEffect(() => {
    if (visible) {
      setActiveLabel(null);
    }
  }, [visible]);

  const handleClickSearch = (label: string) => {
    setActiveLabel((prev) => (prev === label ? null : label));
  };

  // 🟢 استخراج أسماء المدن بدون تكرار لـ "Suggested Destinations"
  const uniqueCities = useMemo(() => {
    if (!cities || cities.length === 0) return [];
    return Array.from(new Set(cities.map((c) => c.city)));
  }, [cities]);

  // 🟢 الدالة الخاصة باختيار مدينة عند الضغط عليها في القائمة
  const handleSelectCity = (cityName: string) => {
    setSelectedCity(cityName);
    setActiveLabel(null); // إغلاق الـ Dropdown بعد الاختيار
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
            className={`search_btn ${currentTitleLower} ${
              isCurrentActive ? "visible" : ""
            }`}>
            <p>{title}</p>

            {/* 🟢 ربط حقل الإدخال بالـ State القادمة من الهوك */}
            {title === "Where" ? (
              <input
                className="inp"
                placeholder={descraption}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()} // منع إغلاق القائمة عند الكتابة
              />
            ) : (
              <span>{descraption}</span>
            )}

            {title === "Who" && (
              <div className={`search_icon ${!activeLabel ? "" : "visible"}`}>
                <RiSearchLine />
                <span>Search</span>
              </div>
            )}
          </div>
        );
      })}

      {/* شريط البحث الخاص بالشاشات الصغيرة */}
      <div className="search_input">
        <RiSearchLine />
        <span data-search>Start your search</span>
      </div>

      {/* القائمة المنسدلة DropDown */}
      <DropDown  className={!activeLabel ? "" : activeLabel}>
        {dataWhere
          .filter((item) => item.type === activeLabel?.toLowerCase().trim())
          .map((item, i) => {
            return (
              <div key={i} className={`child-${item.type}`}>
                {/* 🟢 قسم الوجهات - Where */}

                {item.type === "where"  && (
                  <>
                    {filteredApartments.length > 0  ? (
                      <>
                        {/* عرض المدن القادمة من الـ API مباشرة */}
                        {uniqueCities.map((cityName) => (
                          <div
                            key={cityName}
                            className="where_card-btn"
                            onClick={() => handleSelectCity(cityName)}>
                            <div
                              style={{ backgroundColor: "var(--bg-color-btn)" }}
                              className="svg">
                              <RiMapPinLine />
                            </div>
                            <div className="card_descraption">
                              <span>{}</span>
                              <p>Popular destination</p>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
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
                            <div
                              key={id}
                              className="where_card-btn"
                              onClick={() => handleSelectCity(titleDataWhere)}>
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
                  </>
                )}

                {/* قسم الأشخاص - Who */}
                {item.type === "who" && (
                  <>
                    {item.whoData?.map((who) => (
                      <WhoCard key={who.id} who={who} />
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
