export interface Currencies {
  [key: string]: string; // { EUR: "€", TRY: "TL", USD: "$" }
}

export interface Apartment {
  id: string | number;
  img: string;
  title: string;
  history: string;
  month: string;
  price: number;
  rating: number;
  currencyKey?: string;
}

export interface CityData {
  id: string | number;
  city: string;
  defaultCurrency: string;
  apartments: Apartment[];
}

export interface ApiResponse {
  currencies: Currencies;
  cities: CityData[];
}