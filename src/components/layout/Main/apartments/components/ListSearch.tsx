import { RiSearchLine } from "@remixicon/react";
import { useApartmentsContext } from "../../../../../context/ApartmentsContext";
import "./list-search.scss";

const ListSearch = () => {
  const { filterCityData, curentRef } = useApartmentsContext();

  const searchDate = Object.entries(filterCityData);
  const isVisble =  curentRef.current

  return (
    <section className={`list_search ${isVisble   ?  "visible" : ""}`}>

      {/*  */}
      <div className="container">



        {searchDate.map(([city, item]) => (
          <div className="compnents_search" key={item.id}>
            <div className="city_inp">
              
              <input autoComplete="off" autoFocus={false} value={city} type="text" />
              <RiSearchLine />
            </div>

            <div className="price">
                  <span>price</span>
                </div>


          </div>
        ))}
      </div>
    </section>
  );
};

export default ListSearch;
