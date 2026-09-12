import { useEffect, useMemo, useState } from "react";
import type { ApiResponse } from "../components/layout/Main/apartments/types/apartment.types";

const API_URL = "https://api.npoint.io/4593405b89d26a12ebdb";

export const useApartments = () => {
  const [cities, setCities] = useState<ApiResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // الفلاتر
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("all");

  const fatchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw Error("massing data not Found!!");
      }
      const data: ApiResponse = await response.json();

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

  // البحث في أسماء المدن
  const citySearchFilter = useMemo(() => {
    if (!cities?.cities) return [];

    return Object.entries(cities.cities)
      .filter(([cityName]) =>
        cityName.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
      .map(([cityName, cityData]) => ({
        cityName,
        ...cityData,
      }));
  }, [cities, searchQuery]);

  // فلترة المدن المحددة
// فلترة المدن المحددة داخل useApartments
const fliterCityData = useMemo(() => {
  if (!cities?.cities) return {};

  const cityFilter = selectedCity.trim().toLowerCase();

  if (!cityFilter || cityFilter === "all") {
    return cities.cities;
  }

  // البحث بالحروف الصغيرة للمفتاح
  if (cities.cities[cityFilter]) {
    return {
      [cityFilter]: cities.cities[cityFilter],
    };
  }

  return {};
}, [cities, selectedCity]);
  // استخراج المدن التي لا تطابق المدينة المحددة
const filter = useMemo(() => {
  if (!cities?.cities) return [];

  const currentSelected = selectedCity.trim().toLowerCase();

  // تحويل كائن المدن بالكامل إلى مصفوفة
  const allCitiesArray = Object.entries(cities.cities).map(([cityName, cityData]) => ({
    cityName,
    ...cityData,
  }));

  // 1. إذا كانت الحالة "all" أو غير محدودة، ارجع جميع المدن
  if (!currentSelected || currentSelected === "all") {
    return allCitiesArray;
  }

  // 2. عند اختيار مدينة معينة، ابقِ عليها فقط واحذف الباقي من المصفوفة
  return allCitiesArray.filter(
    (item) => item.cityName.toLowerCase() === currentSelected
  );
}, [cities, selectedCity]);

  return {
    cities,
    loading,
    setLoading,
    error,
    fatchData,
    fliterCityData,
    citySearchFilter,
    filter,
    search: {
      searchQuery,
      setSearchQuery,
      selectedCity,
      setSelectedCity,
    },
  };
};