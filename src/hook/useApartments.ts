import { useEffect, useMemo, useState } from "react";
import type { ApiResponse } from "../components/layout/Main/apartments/types/apartment.types";

const API_URL = "https://6a78f2ae674f43f4db10f4cd.mockapi.io/apartments/cities";

export const useApartments = () => {
  const [cities, setCities] = useState<ApiResponse[]>([]);
  // const [currencies, setCurrencies] = useState<Currencies>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // الفلاتر
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [minRating, setMinRating] = useState<number>(0);

  const fatchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw Error("massing data not Found!!");
      }
      const data = await response.json();

      setCities(data);
    } catch (error) {
      setError("404" + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.resolve().then(fatchData);
  }, []);

  const allApartments = useMemo(() => {
    if (!cities || cities.length == 0) return [];

    return cities
      .flatMap((city) => city.cities || [])
      .flatMap((city) =>
        city.apartments.map((apt) => ({
          ...apt,
          cityName: city.city,
          defaultCurrencyKey: city.defaultCurrency,
        })),
      );
  }, [cities]);

  const filterApartments = useMemo(() => {
    return allApartments.filter((apt) => {
      // 🟢 1. التحقق من المدينة: استثناء حالة "all" أو القيمة الفارغة
      if (
        selectedCity &&
        selectedCity !== "all" &&
        apt.cityName.toLowerCase() !== selectedCity.toLowerCase()
      ) {
        return false;
      }

      // 🟢 2. دمج البحث بالنص (searchQuery) إذا وُجد
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const matchCity = apt.cityName.toLowerCase().includes(query);
        const matchTitle = apt.title?.toLowerCase().includes(query); // إن وجد عنوان للشقة
        if (!matchCity && !matchTitle) return false;
      }

      // 🟢 3. الأسعار والتقييمات
      if (maxPrice && apt.price > maxPrice) return false;
      if (minRating && apt.rating < minRating) return false;

      return true;
    });
  }, [allApartments, maxPrice, minRating, searchQuery, selectedCity]);

  const fliterCityData = useMemo(() => {
    if (!cities) return [];

    return cities
      .flatMap((city) => city.cities || [])
      .filter((cityObj) =>
        cityObj.city.toLowerCase().includes(selectedCity.toLowerCase().trim()),
      );
  }, [cities, selectedCity]);

  return {
    cities,
    loading,
    error,
    fatchData,
    fliterCityData,
    filterApartments,
    search: {
      searchQuery,
      setSearchQuery,
      selectedCity,
      setSelectedCity,
    },
  };
};
