import { useApartmentsContext } from "../../../../context/ApartmentsContext";
import NotFoundPage from "../../../ui/Error/NotFoundPage";
import Loader from "../../../ui/Loader/Loader";
import "./apartments.scss";
import { CityApartmentsRow } from "./components/CityApartmentsRow";

export const PopularApartments = () => {
  const { fliterCityData, error, loading, fatchData, search, filter } =
    useApartmentsContext();

    console.log(fliterCityData)
  const { selectedCity, setSelectedCity } = search;
  if (loading) return <Loader />;

  if (error) return <NotFoundPage errorMessage={error} fatchData={fatchData} />;

  if (filter.length === 0)
    return (
      <section className="card not-found">
        <div className="container">
          <p>its city {selectedCity} not found</p>
          <button
            className="restart"
            type="button"
            onClick={() => setSelectedCity("")}>
            Restart
          </button>
        </div>
      </section>
    );

  return (
    <section className="card">
      {Object.entries(fliterCityData).map(([cityName, cityData]) => (
        <CityApartmentsRow cityData={{city: cityName, ...cityData}} key={cityName} />
      ))}
    </section>
  );
};

export default PopularApartments;
