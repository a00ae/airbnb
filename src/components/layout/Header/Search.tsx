import {
  RiSearchLine,
  RiAddLine,
  RiSubtractLine,
  RiMapPinLine,
  RiCloseLine,
} from "@remixicon/react";
import { dataWhere, itemButtonSearch, type DataSearchWho } from "./index";
import "./search.scss";
import { useState, memo, useRef, useEffect} from "react";
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
  const { search, citySearchFilter,  setLoading, loading } = useApartmentsContext();
  const { searchQuery, setSearchQuery, setSelectedCity } = search;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChangeSearchValue = (value: string) => {
    setSearchQuery(value);
  };



  const handleClickSearch = (title: string) => {
    const normalizedTitle = title.trim().toLowerCase(); // تحويل لـ where, when, who
    const currentActive = activeLabel?.trim().toLowerCase();

    onLabelChange(currentActive === normalizedTitle ? null : normalizedTitle);
  };

  // 🟢 استخراج أسماء المدن بدون تكرار لـ "Suggested Destinations"

const handleSelectCity = (city: string) => {
  console.log("🚀 [1] تم الضغط على المدينة:", city);

  // التأكد من إلغاء أي مؤقت سابق إن وجد
  if (timerRef.current) {
    console.log("⚠️ [2] تم إلغاء مؤقت سابق كان يعلم في الخلفية:", timerRef.current);
    clearTimeout(timerRef.current);
  }

  // 1. تشغيل حالة التحميل
  console.log("⏳ [3] تغيير حالة loading إلى: true");
  setLoading(true);

  // 2. معالجة النص والتحديثات
  const activeCity = city.split(",")[0].trim();
  console.log("✂️ [4] المدينة بعد القاطع والـ Trim:", activeCity);

  setSelectedCity(activeCity);
  onLabelChange(null);
  setSearchQuery("");

  // 3. ضبط المؤقت في الخلفية
  timerRef.current = setTimeout(() => {
    console.log("✅ [5] انقضت 500ms - تغيير حالة loading إلى: false");
    setLoading(false);
    timerRef.current = null; // إعادة تعيين المرجع
  }, 500);

  console.log("📌 [6] تم جدولة المؤقت برقم ID:", timerRef.current);
};

// متابعة تنظيف المؤقت عند إغلاق المكون (Unmount)
useEffect(() => {
  // نحفظ المرجع الحالي داخل المتغير لتجنب تحذيرات ESLint
  const currentTimer = timerRef.current;

  return () => {
    if (currentTimer) {
      console.log("🧹 [Cleanup] تم إلغاء المؤقت بنجاح:", currentTimer);
      clearTimeout(currentTimer);
    }
  };
}, [loading]); // سيتنفّذ التنظيف كلما تغيرت حالة loading




  /*=============== remove data search ===============*/
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

            {/* 🟢 ربط حقل الإدخال بالـ State القادمة من الهوك */}
            {title === "Where" ? (
              <div className="inp-box">
                <input
                  className="inp"
                  value={searchQuery}
                  onChange={(e) => handleChangeSearchValue(e.target.value)}
                  placeholder={descraption}
                  onClick={(e) => e.stopPropagation()} // منع إغلاق القائمة عند الكتابة
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

            {title === "Who" && (
              <div
                className={`search_icon ${["where", "when", "who"].includes(activeLabel?.toLowerCase() ?? "") ? "visible" : ""}`}>
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
      <DropDown className={activeLabel || ""}>
        {dataWhere
          .filter((item) => item.type === activeLabel?.toLowerCase().trim())
          .map((item, i) => {
            return (
              <div key={i} className={`child-${item.type}`}>
                {/* 🟢 قسم الوجهات - Where */}

                {item.type === "where" && (
                  <>
                    <span>Suggested destinations</span>
                    {searchQuery.length > 2
                      ? citySearchFilter.map((ele) => (
                          <div
                            key={ele.id}
                            className="where_card-btn search-city"
                            onClick={() => handleSelectCity(ele.city)}>
                            <div
                              style={{ backgroundColor: "#23322" }}
                              className="svg">
                              <RiMapPinLine />
                            </div>
                            <div className="card_descraption">
                              <span>{ele.city}</span>
                            </div>
                          </div>
                        ))
                      : item.whereData?.map(
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

export default memo(Search);
