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
  // const [maxPrice, setMaxPrice] = useState<number>(500);
  // const [minRating, setMinRating] = useState<number>(0);

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


    const citySearchFilter = useMemo(() => {
    if (!cities) return [];

    return cities
      .flatMap((ele) => ele.cities || [])
      .filter((cityObj) =>
        cityObj.city.toLowerCase().includes(searchQuery.trim().toLowerCase()),
      );
  }, [cities, searchQuery]);


const fliterCityData = useMemo(() => {
  if (!cities || cities.length === 0) return [];

  const cityFilter = selectedCity.trim().toLowerCase();

  // 🟢 1. في حال لم يحدد المستخدم أي مدينة (أو كانت القيمة "all")
  // نرجع البيانات كما هي مباشرة دون إجراء أي عمليات فلترة معقدة
  if (!cityFilter || cityFilter === "all") {
    return cities;
  }

  // 🟢 2. تقوم بالفلترة فقط عند تحديد مدينة معينة بالنقر عليها
  return cities
    .map((group) => ({
      ...group,
      cities: (group.cities || []).filter(
        (cityObj) => cityObj.city.toLowerCase() === cityFilter
      ),
    }))
    .filter((group) => group.cities && group.cities.length > 0);
}, [cities, selectedCity]);


  const filter = useMemo(()=> {

    return fliterCityData
      .flatMap((ele) => ele.cities || [])
      .filter((city) => city.city !== selectedCity)


  }, [fliterCityData, selectedCity]);

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
      // setMaxPrice,
      // setMinRating
    },
  };
};
