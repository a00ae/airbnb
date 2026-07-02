import { RiSearchLine } from "@remixicon/react";
import { itemButtonSearch } from "./index";
import "./search.scss";
import { useState } from "react";



const Search = () => {
  // نجعل الـ State تخزن فقط اسم الزر النشط حالياً (أو null إذا كان الكل مغلق)
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  const handleClickSearch = (label: string) => {
    // إذا ضغط المستخدم على الزر المفتوح حالياً، نقوم بإغلاقه (null)
    // وإذا ضغط على زر آخر، نفتح الزر الجديد
    setActiveLabel((prev) => (prev === label ? null : label));
  };

  return (
    <div className="search">
      {itemButtonSearch.map(({ descraption, title }) => {
        const currentTitleLower = title.trim().toLowerCase();
        // نتحقق هل هذا الزر الحالي هو النشط؟
        const isCurrentActive = activeLabel === title;

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

            {/* هنا نضيف كلاس visible فقط إذا كان هذا الزر هو النشط فعلياً */}
            <div className={`last-${currentTitleLower} ${isCurrentActive ? "visible" : ""}`}>
              {/* محتوى القائمة المنسدلة */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Search;