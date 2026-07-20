import {
  RiArrowLeftSLine,
  RiArrowRightLongLine,
  RiArrowRightSLine,
  RiStarFill,
} from "@remixicon/react";
import "./card.scss";
import itemData from "../../../../data/mockData.json";
import { useState, useEffect, useRef } from "react";

// 1. المكون الرئيسي
const Card = () => {
  return (
    <section className="card">
      {itemData.map((cityData) => (
        <CityApartmentsRow key={cityData.id} cityData={cityData} />
      ))}
    </section>
  );
};

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

interface CityData {
  city: string;
  id: string | number;
  currency: string;
  apartments: Apartment[];
}

// 2. المكون الفرعي المستقل لكل صف شقق
const CityApartmentsRow = ({ cityData }: { cityData: CityData }) => {
  const { city, apartments, currency } = cityData;
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [visibleCards, setVisibleCards] = useState<number>(7);
  
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const cardWidth = 170; // عرض الكرت الإجمالي شامل الـ Gap والتنسيق


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
          <button onClick={prevSlide} disabled={isPrevDisabled} className="arrow">
            <RiArrowLeftSLine />
          </button>
          {/* زر التقدم للأمام */}
          <button onClick={nextSlide} disabled={isNextDisabled} className="arrow">
            <RiArrowRightSLine />
          </button>
        </div>
      </div>

      {/* الحاوية الخارجية الثابتة */}
      <div
        ref={wrapperRef}
        className="apartments_real-estate-card"
        style={{ overflow: "hidden", width: "100%" }}
      >
        {/* صف الكروت الداخلي الذي يتحرك */}
        <div
          className="cards-track"
          style={{
            display: "flex",
            transform: `translateX(${-currentIndex * cardWidth}px)`,
            transition: "transform 0.4s ease-out"
          }}
        >
          {apartments.map((item) => (
            <div 
              key={item.id} 
              className="apartments_real-estate-cards" 
              style={{ flexShrink: 0, width: `${cardWidth}px` }}
            >
              <div className="img-cards">
                <img src={item.img} alt={item.title} />
              </div>
              <div className="card-description">
                <span data-card-title>{item.title}</span>
                <span data-card-deta>
                  {item.history} {item.month}
                </span>
                <div className="card-description_price">
                  <span data-card-price>
                    {currency} {item.price} total
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
