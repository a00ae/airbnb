import { useNavigate, useParams } from "react-router";
import { useApartmentsContext } from "../../../../context/ApartmentsContext";
import NotFoundPage from "../../../../pages/NotFoundPage";
import Loader from "../../../ui/Loader/Loader";
import "./apartments.scss";
import { CityApartmentsRow } from "./components/CityApartmentsRow";

export const PopularApartments = () => {
  const { filterCityData, error, loading, search } = useApartmentsContext();
  const { setSelectedCity } = search;
  const { cityName } = useParams();
  const navigate = useNavigate();

  // تحويل البيانات لـ Entries مرة واحدة فقط
  const cityEntries = Object.entries(filterCityData);

  // 1. حالة التحميل
  if (loading) return <Loader />;

  // 2. حالة الأخطاء البرمجية أو الشبكة
  if (error) return <NotFoundPage />;

  // 3. حالة عدم وجود نتائج للمدينة المطلوبة
  if (cityEntries.length === 0) {
    const currentCityName = cityName
      ? decodeURIComponent(cityName)
      : "Selected";

    return (
      <section className="card not-found">
        <div className="container">
          <p>The city "{currentCityName}" was not found</p>
          <button
            className="restart"
            type="button"
            onClick={() => {
              setSelectedCity("all");
              navigate("/airbnb"); // التوجيه للرئيسية ومسار الرابط الأصلي
            }}>
            Restart Search
          </button>
        </div>
      </section>
    );
  }

  // 4. عرض النتائج
  return (
    <section className="card">
      {cityEntries.map(([name, cityData]) => (
        <CityApartmentsRow
          cityData={{ ...cityData, city: name }}
          key={name}
        />
      ))}
    </section>
  );
};
