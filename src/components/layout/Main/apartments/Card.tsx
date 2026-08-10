import {
  RiArrowLeftSLine,
  RiArrowRightLongLine,
  RiArrowRightSLine,
  RiStarFill,
} from "@remixicon/react";
import "./card.scss";
import { useState, useEffect, useRef } from "react";
import Loader from "../../../ui/Loder/Loader";

// تعريف الأنواع (Types)
interface Apartment {
  id: string | number;
  img: string;
  title: string;
  history: string;
  month: string;
  price: number;
  rating: number;
}

interface CurrencyType {
  euro: string;
  tl: string;
  dolar: string;
}

interface CityData {
  city: string;
  id: string | number;
  currency: CurrencyType;
  apartments: Apartment[];
}

// 1. المكون الرئيسي
const Card = () => {
  const [cities, setCities] = useState<CityData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCitiesData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        "https://6a78f2ae674f43f4db10f4cd.mockapi.io/apartments/cities",
      );

      if (!response.ok) {
        throw new Error(
          `Server error: ${response.text} ${response.statusText}`,
        );
      }

      const data: CityData[] = await response.json();

      setCities(data);
    } catch (err) {
      console.error("Data fetching failed:", err);

      setError("An unexpected error occurred while connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.resolve().then(fetchCitiesData);
  }, []);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="error-box">
        <p>❌ فشل التحميل: {error}</p>
        <button onClick={fetchCitiesData}>إعادة المحاولة</button>
      </div>
    );

  return (
    <section className="card">
      {cities.map((cityData) => (
        <CityApartmentsRow key={cityData.id} cityData={cityData} />
      ))}
    </section>
  );
};

// 2. المكون الفرعي المستقل لكل صف شقق
const CityApartmentsRow = ({ cityData }: { cityData: CityData }) => {
  const { city, apartments, currency } = cityData;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [visibleCards, setVisibleCards] = useState<number>(7);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const cardWidth = 160; // عرض الكرت الإجمالي شامل الـ Gap والتنسيق

  // حساب كم كرت يمكن للشاشة استيعابه حالياً
  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        const wrapperWidth = wrapperRef.current.offsetWidth;
        const count = Math.floor(wrapperWidth / cardWidth);
        setVisibleCards(count > 0 ? count : 1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // شروط تفعيل وتعطيل الأزرار بشكل ديناميكي وصحيح لكل مدينة
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex + visibleCards > apartments.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  return (
    <div className="apartments">
      {/* العناوين والأزرار */}
      <div className="apartments_heading-container">
        <div className="left">
          <h2>Popular homes in {city}</h2>
          <div className="arrow">
            <RiArrowRightLongLine />
          </div>
        </div>
        <div className="right">
          {/* زر العودة للخلف */}
          <button
            onClick={prevSlide}
            disabled={isPrevDisabled}
            className="arrow">
            <RiArrowLeftSLine />
          </button>
          {/* زر التقدم للأمام */}
          <button
            onClick={nextSlide}
            disabled={isNextDisabled}
            className="arrow">
            <RiArrowRightSLine />
          </button>
        </div>
      </div>

      {/* الحاوية الخارجية الثابتة */}
      <div
        ref={wrapperRef}
        className="apartments_real-estate-card"
        style={{ overflow: "hidden", width: "100%" }}>
        {/* صف الكروت الداخلي الذي يتحرك */}
        <div
          className="cards-track"
          style={{
            display: "flex",
            transform: `translateX(${-currentIndex * cardWidth}px)`,
            transition: "transform 0.4s ease-out",
          }}>
          {apartments.map((item) => (
            <div
              key={item.id}
              className="apartments_real-estate-cards"
              style={{ flexShrink: 0, width: `${cardWidth}px` }}>
              <div className="img-cards">
                <img
                  src={`${import.meta.env.BASE_URL}${item.img}`}
                  alt={item.title}
                />
              </div>
              <div className="card-description">
                <span data-card-title>{item.title}</span>
                <span data-card-deta>
                  {item.history} {item.month}
                </span>
                <div className="card-description_price">
                  <span data-card-price>
                    {currency.euro} {item.price} total
                  </span>
                  <div className="rating">
                    <RiStarFill />
                    <span>{item.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
