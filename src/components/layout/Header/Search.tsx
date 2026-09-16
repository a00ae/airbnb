import {
  RiSearchLine,
  RiAddLine,
  RiSubtractLine,
  RiMapPinLine,
  RiCloseLine,
} from "@remixicon/react";
import { dataWhere, itemButtonSearch, type DataSearchWho } from "./index";
import "./search.scss";
import { useState, memo, useRef, useEffect } from "react";
import DropDown from "../../ui/Card/Drop-Down/Drop-down";
import { useApartmentsContext } from "../../../context/ApartmentsContext";

type SearchProps = {
  activeLabel: string | null;
  onLabelChange: (label: string | null) => void;
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
        <button
          type="button"
          disabled={count == 0}
          onClick={() => setCount((prev) => Math.max(0, prev - 1))}
          className="discriment">
          <RiSubtractLine />
        </button>
        <span className="valued">{count}</span>
        <button
          type="button"
          disabled={count >= 100}
          onClick={() => setCount((prev) => prev + 1)}
          className="increment">
          <RiAddLine />
        </button>
      </div>
    </div>
  );
};

/* Search Section Component */
const Search = ({ activeLabel, onLabelChange }: SearchProps) => {
  console.log("Re-render");
  const [nearby, setNearby] = useState<boolean>(false);
  const curentRef = useRef<string | null>(null);
  const { search, citySearchFilter, setLoading, cityNames } =
    useApartmentsContext();
  const { searchQuery, setSearchQuery, setSelectedCity } = search;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  console.log(cityNames);

  const handleChangeSearchValue = (value: string) => {
    setSearchQuery(value);
  };

  const handleClickSearch = (title: string) => {
    const normalizedTitle = title.trim().toLowerCase();
    const currentActive = activeLabel?.trim().toLowerCase();

    onLabelChange(currentActive === normalizedTitle ? null : normalizedTitle);
  };

  const handleSelectCity = (city: string) => {
    curentRef.current = city.split(",")[0].trim().toLowerCase();
    console.log("🚀 [1] تم الضغط على المدينة:", city);

    if (curentRef.current === "nearby") {
      console.log("Nearby Clicked");
      // تبديل حالة القريبة وتفادي مسح الوسم النشط
      setNearby((prev) => !prev);
      return;
    }

    setNearby(false);

    // إلغاء أي مؤقت سابق مفعل
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setLoading(true);
    setSelectedCity(curentRef.current);
    setSearchQuery("");
    onLabelChange("");

    // جدولة إيقاف التحميل
    timerRef.current = setTimeout(() => {
      setLoading(false);
      timerRef.current = null;
    }, 500);
  };

  // تنظيف المؤقت فقط عند خروج المكون من الشاشة (Unmount)
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []); // مصفوفة فارغة للتأكد من التنظيف عند Unmount فقط

  const removeDataSearch = () => setSearchQuery("");

  return (
    <div
      className={`search ${activeLabel ? "active" : ""}`}
      data-active={activeLabel?.trim().toLowerCase() || ""}>
      {itemButtonSearch.map(({ descraption, title }) => {
        const currentTitleLower: string = title.trim().toLowerCase();
        const isCurrentActive: boolean =
          activeLabel?.trim().toLowerCase() === currentTitleLower;

        return (
          <div
            onClick={() => handleClickSearch(title)}
            key={title}
            className={`search_btn ${currentTitleLower} ${
              isCurrentActive ? "visible" : ""
            }`}>
            <p>{title}</p>

            {title === "Where" ? (
              <div className="inp-box">
                <input
                  className="inp"
                  value={searchQuery}
                  onChange={(e) => handleChangeSearchValue(e.target.value)}
                  placeholder={descraption}
                  onClick={(e) => e.stopPropagation()}
                />

                <button
                  onClick={removeDataSearch}
                  className="close"
                  type="button">
                  {searchQuery && <RiCloseLine />}
                </button>
              </div>
            ) : (
              <span>{descraption}</span>
            )}
          </div>
        );
      })}

      <div
        onClick={() => console.log("Search Clicked")}
        className={`search_icon ${
          ["where", "when", "who"].includes(activeLabel?.toLowerCase() ?? "")
            ? "visible"
            : ""
        }`}>
        <RiSearchLine />
        <span>Search</span>
      </div>

      <div
        onClick={() => console.log("Search Clicked")}
        className="search_input">
        <RiSearchLine />
        <span data-search>Start your search</span>
      </div>

      {/* القائمة المنسدلة DropDown */}
      <DropDown className={activeLabel || ""}>
        {dataWhere
          .filter((item) => item.type === activeLabel?.toLowerCase().trim())
          .map((item, i) => {
            return (
              <div key={i} className={`child-${item.type}`}>
                {item.type === "where" && (
                  <>
                    <span>Suggested destinations</span>
                    {searchQuery.length > 2 ? (
                      citySearchFilter.map((ele) => (
                        <div
                          key={ele.id}
                          className="where_card-btn search-city"
                          onClick={() => handleSelectCity(ele.cityName)}>
                          <div
                            style={{ backgroundColor: "#23322" }}
                            className="svg">
                            <RiMapPinLine />
                          </div>
                          <div className="card_descraption">
                            <span>{ele.cityName}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <>
                        {!nearby
                          ? item.whereData?.map(
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
                                  onClick={(e) => {
                                    e.stopPropagation(); // منع إغلاق الـ Dropdown عند الضغط على الكارت
                                    handleSelectCity(titleDataWhere);
                                  }}>
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
                            )
                          : cityNames.map((ele) => (
                              <div
                                key={ele.id}
                                className="where_card-btn search-city"
                                onClick={() => handleSelectCity(ele.cityName)}>
                                <div
                                  style={{ backgroundColor: "#23322" }}
                                  className="svg">
                                  <RiMapPinLine />
                                </div>
                                <div className="card_descraption">
                                  <span>{ele.cityName}</span>
                                </div>
                              </div>
                            ))}
                      </>
                    )}
                  </>
                )}

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

export default memo(Search);
