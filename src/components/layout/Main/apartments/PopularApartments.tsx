import { useApartmentsContext } from "../../../../context/ApartmentsContext";
import NotFoundPage from "../../../ui/Error/NotFoundPage";
import Loader from "../../../ui/Loader/Loader";
import "./apartments.scss";
import { CityApartmentsRow } from "./components/CityApartmentsRow";

export const PopularApartments = () => {
  const { cities, error, loading, fatchData } = useApartmentsContext();

  
  if (loading) return <Loader />;

  if (error) return <NotFoundPage errorMessage={error} fatchData={fatchData} />;

  return (
    <section className="card">
      {cities.map((cityData, index) =>
        cityData.cities.map((city, cityIndex) => (
          <CityApartmentsRow
            cityData={city}
            key={`${index}-${cityIndex}`}
          />
        ))
      )}
    </section>
  );
};

export default PopularApartments;
