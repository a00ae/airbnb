import { RiSearchLine } from "@remixicon/react";
import { useApartmentsContext } from "../../../../../context/ApartmentsContext";
import "./list-search.scss";


const ListSearch = () => {
  const { filterCityData, search } = useApartmentsContext();
  const {selectedCity} = search;
  const searchDate = Object.entries(filterCityData);


  return (
    <section className={`list_search ${selectedCity !== "all" ?  "visible" : ""}`}>

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
