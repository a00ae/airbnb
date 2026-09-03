import { useEffect, useState } from "react";
import type {
  ApiResponse,
} from "../components/layout/Main/apartments/types/apartment.types";

const API_URL = "https://6a78f2ae674f43f4db10f4cd.mockapi.io/apartments/cities";

export const useApartments = () => {
  const [cities, setCities] = useState<ApiResponse[]>([]);
  // const [currencies, setCurrencies] = useState<Currencies>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // الفلاتر
  const [searchQuery, setSearchQuery] = useState<string>("");
  // const [selectedCity, setSelectedCity] = useState<string>("all");
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

  return {
    cities,
    loading,
    error,
    fatchData,
    search: {
      searchQuery,
      setSearchQuery,
    },
  };
};
