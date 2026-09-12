// export interface Currencies {
//   [key: string]: string; // { EUR: "€", TRY: "TL", USD: "$" }
// }

// export interface Apartment {
//   id: string | number;
//   img: string;
//   title: string;
//   history: string;
//   month: string;
//   price: number;
//   rating: number;
//   currencyKey?: string;
// }

// export interface CityData {
//   id: string | number;
//   city: string;
//   defaultCurrency: string;
//   apartments: Apartment[];
// }

// export interface ApiResponse {
//   currencies: Currencies;
//   cities: CityData[];
// }


export interface CurrencyMap {
  [code: string]: string;
}

export interface Apartment {
  id: number;
  district: string;
  title: string;
  img: string;
  history: string;
  month: string;
  price: number;
  rating: number;
}

export interface CityData {
  id: number;
  city?: string;
  defaultCurrency: string;
  apartments: Apartment[];
}

export interface ApiResponse {
  currencies: CurrencyMap;
  cities: Record<string, CityData>; // الوصول المباشر عبر اسم المدينة كـ key
}

// واجهة شروط البحث
export interface SearchParams {
  cityName: string;
  districtName?: string;
  minRating?: number;
  maxPrice?: number;
}