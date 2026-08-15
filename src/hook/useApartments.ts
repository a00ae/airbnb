import { useEffect, useMemo, useState } from "react";
import type {
  ApiResponse,
  CityData,
  Currencies,
} from "../components/layout/Main/apartments/types/apartment.types";

const API_URL = "https://6a78f2ae674f43f4db10f4cd.mockapi.io/apartments/cities";



export const useApartments = () => {
  const [cities, setCities] = useState<CityData[]>([]);
  const [currencies, setCurrencies] = useState<Currencies>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // الفلاتر
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [minRating, setMinRating] = useState<number>(0);  

  const fetchApartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(
          `Server error: ${response.status} ${response.statusText}`,
        );
      }
      const result: ApiResponse[] = await response.json();

      if (result && result.length > 0) {
        setCurrencies(result[0].currencies || {});
        setCities(result[0].cities || []);
      }
    } catch (err) {
      console.error("Data fetching failed:", err);
      setError("An unexpected error occurred while connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.resolve().then(fetchApartments); 
  }, []);

  // دمج كل الشقق في مصفوفة واحدة
  const allApartments = useMemo(() => {
    if (!cities || cities.length === 0) return [];
    
    return cities.flatMap((city) =>
      city.apartments.map((apt) => ({
        ...apt,
        cityName: city.city,
        defaultCurrencyKey: city.defaultCurrency,
      }))
    );
  }, [cities]);

  // فلترة الشقق بناءً على المعايير
  const filteredApartments = useMemo(() => {
    return allApartments.filter((apt) => {
      // 🟢 دعم مطابقة المدن بغض النظر عن حالة الأحرف ودعم خيار "جميع المدن"
      if(searchQuery && !apt.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;

      if (selectedCity && apt.cityName !== selectedCity ) {
        return false;
      }

      if (maxPrice && apt.price > maxPrice) return false;
      if (minRating && apt.rating < minRating) return false;

      return true;
    });
  }, [allApartments, selectedCity, maxPrice, minRating, searchQuery]);

  // 🟢 استخراج العملة ديناميكياً بحسب المدينة المختارة
  const currentCurrency = useMemo(() => {
    const currentCityObj = cities.find(
      (c) => c.city.toLowerCase() === selectedCity.toLowerCase()
    );
    if (currentCityObj && currencies[currentCityObj.defaultCurrency]) {
      return currencies[currentCityObj.defaultCurrency];
    }
    return "$"; // عملة افتراضية عند تعذر الوصول
  }, [cities, currencies, selectedCity]);

  return {
    filteredApartments,
    allApartments,
    isLoading: loading,
    error,
    currentCurrency,
    fetchApartments,
    cities,
    currencies,
    filters: {
      selectedCity,
      setSelectedCity,
      searchQuery,
      setSearchQuery,
      maxPrice,
      setMaxPrice,
      minRating, 
      setMinRating, 
    },
  };
};