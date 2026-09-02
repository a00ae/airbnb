import Loader from "../../../ui/Loader/Loader";
import { CityApartmentsRow } from "./components/CityApartmentsRow";
import "./apartments.scss";
import { useApartments } from "../../../../hook/useApartments";

export const PopularApartments = () => {
  const {
    fetchApartments,
    isLoading,
    error,
    currentCurrency,
    cities,
    filters, // 🟢 جلب الفلاتر من الهوك
  } = useApartments();

  const { selectedCity } = filters;

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="error-box">
        <p>❌ فشل التحميل: {error}</p>
        <button onClick={fetchApartments}>إعادة المحاولة</button>
      </div>
    );
  }

  // 🟢 فلترة المدن بناءً على بحث المستخدم
  // إذا لم يبحث المستخدم عن شيء (فارغ أو "all") يعرض جميع المدن كما هي
  const displayedCities = cities.filter((cityData) => {
    if (!selectedCity || selectedCity.trim() === "" || selectedCity === "all") {
      return true; // إظهار الكل
    }
    // المطابقة بغض النظر عن حالة الأحرف (Case-insensitive)
    return cityData.city
      .toLowerCase()
      .includes(selectedCity.trim().toLowerCase());
  });

  return (
    <section className="card">
      {displayedCities.length > 0 ? (
        displayedCities.map((cityData) => (
          <CityApartmentsRow
            key={cityData.id}
            cityData={cityData}
            currencies={{ [currentCurrency]: currentCurrency }}
          />
        ))
      ) : (
        <div className="no-results">
          <p>لا توجد نتائج تطابق المدينة: "{selectedCity}"</p>
        </div>
      )}
    </section>
  );
};

export default PopularApartments;
