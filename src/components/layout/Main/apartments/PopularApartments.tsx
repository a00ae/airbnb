import { useState, useEffect } from "react";
import Loader from "../../../ui/Loder/Loader";
import { CityApartmentsRow } from "./components/CityApartmentsRow";
import type { ApiResponse, CityData, Currencies } from "./types/apartment.types";
import "./apartments.scss";

const API_URL = "https://6a78f2ae674f43f4db10f4cd.mockapi.io/apartments/cities";

export const PopularApartments = () => {
  const [cities, setCities] = useState<CityData[]>([]);
  const [currencies, setCurrencies] = useState<Currencies>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCitiesData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const data: ApiResponse[] = await response.json();

      // الاستجابة تأتي كمصفوفة فيها عنصر رئيسي واحد يحتوي على currencies و cities
      if (data && data.length > 0) {
        setCurrencies(data[0].currencies || {});
        setCities(data[0].cities || []);
      }
    } catch (err) {
      console.error("Data fetching failed:", err);
      setError("An unexpected error occurred while connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitiesData();
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="error-box">
        <p>❌ فشل التحميل: {error}</p>
        <button onClick={fetchCitiesData}>إعادة المحاولة</button>
      </div>
    );
  }

  return (
    <section className="card">
      {cities.map((cityData) => (
        <CityApartmentsRow 
          key={cityData.id} 
          cityData={cityData} 
          currencies={currencies} 
        />
      ))}
    </section>
  );
};

export default PopularApartments;