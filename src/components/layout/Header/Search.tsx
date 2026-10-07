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
import { useNavigate, useParams } from "react-router";
import type{CityItemProps,  DestinationItemProps, SearchProps, WhereSectionProps, } from "./index";
 

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

// 1. مكون فرعي لبطاقات المدن البسيطة
const CityItem = ({ cityName, onSelect }: CityItemProps) => (
  <div
    className="where_card-btn search-city"
    onClick={() => onSelect(cityName)}>
    <div style={{ backgroundColor: "#23322" }} className="svg">
      <RiMapPinLine />
    </div>
    <div className="card_descraption">
      <span>{cityName}</span>
    </div>
  </div>
);

// 2. مكون فرعي للوجهات المخصصة
const DestinationItem = ({ item, onSelect }: DestinationItemProps) => {
  const { id, iconDataWhere, titleDataWhere, descraptionDataWhere, bgColor } =
    item;

  return (
    <div
      key={id}
      className="where_card-btn"
      onClick={(e) => {
        e.stopPropagation();
        onSelect(titleDataWhere);
      }}>
      <div style={{ backgroundColor: bgColor }} className="svg">
        {iconDataWhere}
      </div>
      <div className="card_descraption">
        <span>{titleDataWhere}</span>
        <p>{descraptionDataWhere}</p>
      </div>
    </div>
  );
};

// 3. مكون فرعي يعبر عن عدم وجود نتائج بحث (Empty State)
const NoResultsFound = () => (
  <div
    className="no_results-container"
    style={{ padding: "16px", textAlign: "center" }}>
    <div
      className="svg"
      style={{ margin: "0 auto 8px auto", width: "fit-content" }}>
      <RiSearchLine size={24} color="#888" />
    </div>
    <span style={{ fontWeight: "bold", display: "block" }}>
      The city does not exist{" "}
    </span>
    <p style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
      Try searching for another city or make sure you spelled the name
      correctly.{" "}
    </p>
  </div>
);

// 4. المكون الرئيسي
const WhereSection = ({
  item,
  searchQuery,
  citySearchFilter,
  cityNames,
  nearby,
  handleSelectCity,
}: WhereSectionProps) => {
  if (item.type !== "where") return null;

  const renderContent = () => {
    // حالة البحث (أكثر من حرفين)
    if (searchQuery.length > 2) {
      // إما عرض المدن المطابقة أو عرض رسالة لا توجد نتائج
      if (citySearchFilter.length > 0) {
        return citySearchFilter.map((ele) => (
          <CityItem
            key={ele.id}
            cityName={ele.cityName}
            onSelect={handleSelectCity}
          />
        ));
      }

      return <NoResultsFound />;
    }

    // حالة عدم البحث + عدم تفعيل خيار القريب (عرض الوجهات المخصصة)
    if (!nearby) {
      return item.whereData?.map((data) => (
        <DestinationItem
          key={data.id}
          item={data}
          onSelect={handleSelectCity}
        />
      ));
    }

    // حالة عدم البحث + تفعيل خيار القريب (عرض قائمة المدن الافتراضية)
    return cityNames.map((ele) => (
      <CityItem
        key={ele.id}
        cityName={ele.cityName}
        onSelect={handleSelectCity}
      />
    ));
  };

  return (
    <>
      <span>Suggested destinations</span>
      {renderContent()}
    </>
  );
};

/* Search Section Component */
const Search = ({ activeLabel, onLabelChange }: SearchProps) => {
  const navigate = useNavigate();
  const { cityName } = useParams();
  const [nearby, setNearby] = useState<boolean>(false);
  
  const { search, citySearchFilter, setLoading, cityNames, curentRef } =
    useApartmentsContext();
  const { searchQuery, setSearchQuery, setSelectedCity,  } = search;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 1. مزامنة المدينة المحددة مع الـ URL عند التخصيص/التحديث
  useEffect(() => {
    if (cityName) {
      const decodedCity = decodeURIComponent(cityName).toLowerCase();
      setSelectedCity(decodedCity);
    } else {
      setSelectedCity("all");
    }
  }, [cityName, setSelectedCity]);



  
  const handleChangeSearchValue = (value: string) => {
    setSearchQuery(value);
  };

  const handleClickSearch = (title: string) => {
    const normalizedTitle = title.trim().toLowerCase();
    const currentActive = activeLabel?.trim().toLowerCase();

    onLabelChange(currentActive === normalizedTitle ? null : normalizedTitle);
  };



  // 2. التعامل مع اختيار المدينة وتغيير الرابط الـ URL
  const handleSelectCity = (city: string) => {
    const rawCity = city.split(",")[0].trim();
    curentRef.current = rawCity.toLowerCase();

    if (curentRef.current === "nearby") {
      setNearby((prev) => !prev);
      return;
    }

    setNearby(false);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setLoading(true);
    setSelectedCity(curentRef.current);
    setSearchQuery("");
    onLabelChange(null);

    // 🚀 الانتقال للمسار الجديد بناءً على المدينة المختارة
    if (
      curentRef.current === "all" ||
      curentRef.current === "I'm flexible" ||
      curentRef.current === "im flexible"
    ) {
      navigate("/");
    } else {
      navigate(`/city/${encodeURIComponent(rawCity)}`);
    }

    timerRef.current = setTimeout(() => {
      setLoading(false);
      timerRef.current = null;
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const removeDataSearch = () => setSearchQuery("");

  // 3. التنفيذ عند الضغط على أيقونة Search
  const handleExecuteSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/airbnb/city/${encodeURIComponent(searchQuery.trim())}`);
      onLabelChange(null);
    }
  };

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
        onClick={handleExecuteSearch}
        className={`search_icon ${
          ["where", "when", "who"].includes(activeLabel?.toLowerCase() ?? "")
            ? "visible"
            : ""
        }`}>
        <RiSearchLine />
        <span>Search</span>
      </div>

      <div onClick={handleExecuteSearch} className="search_input">
        <RiSearchLine />
        <span data-search>Start your search</span>
      </div>

      {/* DropDown */}
      <DropDown className={activeLabel || ""}>
        {dataWhere
          .filter((item) => item.type === activeLabel?.toLowerCase().trim())
          .map((item, i) => {
            return (
              <div key={i} className={`child-${item.type}`}>
                {item.type === "where" && (
                  <>
                    <WhereSection
                      cityNames={cityNames}
                      citySearchFilter={citySearchFilter}
                      handleSelectCity={handleSelectCity}
                      item={item}
                      nearby={nearby}
                      searchQuery={searchQuery}
                      key={item.type}
                    />
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
