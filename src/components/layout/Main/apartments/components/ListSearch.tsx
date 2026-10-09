import {
  RiAlignTop,
  RiMapPin2Line,
  RiPriceTag3Line,
  RiSearchLine,
} from "@remixicon/react";
import { useApartmentsContext } from "../../../../../context/ApartmentsContext";
import "./list-search.scss";
import { useState, memo } from "react";

/* 
    TITLE: ----------------------------------------------------
    // TITLE: COMPONENT: ListSearch & Search Filter State
    // TITLE: ----------------------------------------------------
 
 *  NOTE: 
 *  This component is for more precise search customization, such as
 *  - Input verification
 *  - You can filter search results by price, neighborhood, or rating.
 

    TODO: Developing it to be responsive, fast, and with better search filtering.
 
    TEST: Check component re-render when changing searchQuery prop.
    ?QUESTION: Should we debounce the search input for better performance?

 */

const ListSearch = () => {
  const { search } = useApartmentsContext();
  const { selectedCity, setSelectedCity } = search;
  const [isInputFoces, setIsInputFoces] = useState<boolean>(false);

  const handleFocesInputCitySearch = (state: boolean) => {
    setIsInputFoces(!state);
  };

  return (
    <section
      className={`list_search ${selectedCity !== "all" ? "visible" : ""}`}>
      {/*  */}
      <div className="container">
        <div
          onFocus={() => handleFocesInputCitySearch(isInputFoces)}
          className="box-input city_inp">
          <input
            autoComplete="off"
            autoFocus={false}
            value={selectedCity || ""}
            onChange={(e) => setSelectedCity(e.target.value)}
            type="text"
          />
          <RiSearchLine />
        </div>

        <div className="box-input price">
          <span>Price</span>
          <RiPriceTag3Line />
        </div>

        <div className="box-input street-address">
          <input
            type="text"
            autoComplete="off"
            autoFocus={false}
            value="Address"
            readOnly
          />
          <RiMapPin2Line />
        </div>
        <div className="box-input price">
          <span>Reating</span>
          <RiAlignTop />
        </div>
      </div>
    </section>
  );
};

export default memo(ListSearch);
