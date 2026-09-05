import { useApartmentsContext } from "../../../../context/ApartmentsContext";
import NotFoundPage from "../../../ui/Error/NotFoundPage";
import Loader from "../../../ui/Loader/Loader";
import "./apartments.scss";
import { CityApartmentsRow } from "./components/CityApartmentsRow";

export const PopularApartments = () => {
  const { fliterCityData, error, loading, fatchData,search, filter  } = useApartmentsContext();
  const {selectedCity, setSelectedCity} = search
  if (loading) return <Loader />;

  if (error) return <NotFoundPage errorMessage={error} fatchData={fatchData} />;

  if(filter.length === 0) return <div className="card">

  <p>its city {selectedCity} not found</p>
  <button type="button" onClick={() => setSelectedCity("")}>Restart</button>
  </div>


  return (
    <section className="card">
      {fliterCityData.map((group, index) =>
        group.cities.map((city, cityIndex) => (
          <CityApartmentsRow
            cityData={city}
            key={`${index}-${cityIndex}-${city.city}`}
          />
        ))
      )}
    </section>
  );
};

export default PopularApartments;
