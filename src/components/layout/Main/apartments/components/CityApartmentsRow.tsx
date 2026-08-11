import { useState, useEffect, useRef } from "react";
import {
  RiArrowLeftSLine,
  RiArrowRightLongLine,
  RiArrowRightSLine,
} from "@remixicon/react";
import type { CityData, Currencies } from "../types/apartment.types";
import ApartmentCard from "./ApartmentCard";

const CARD_WIDTH = 160;

interface CityApartmentsRowProps {
  cityData: CityData;
  currencies?: Currencies;
}

export const CityApartmentsRow = ({ cityData, currencies }: CityApartmentsRowProps) => {
  const { city, apartments, defaultCurrency } = cityData;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [visibleCards, setVisibleCards] = useState<number>(7);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // تحديد رمز العملة للمدينة من كائن العملات
  const cityCurrencySymbol = currencies && currencies[defaultCurrency] || "$";

  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        const wrapperWidth = wrapperRef.current.offsetWidth;
        const count = Math.floor(wrapperWidth / CARD_WIDTH);
        setVisibleCards(count > 0 ? count : 1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex + visibleCards >= (apartments?.length || 0);

  const nextSlide = () => setCurrentIndex((prev) => prev + 1);
  const prevSlide = () => setCurrentIndex((prev) => prev - 1);

  return (
    <div className="apartments">
      <div className="apartments_heading-container">
        <div className="left">
          <h2>Popular homes in {city}</h2>
          <div className="arrow">
            <RiArrowRightLongLine />
          </div>
        </div>
        <div className="right">
          <button
            onClick={prevSlide}
            disabled={isPrevDisabled}
            className="arrow"
            aria-label="Previous Slide"
          >
            <RiArrowLeftSLine />
          </button>
          <button
            onClick={nextSlide}
            disabled={isNextDisabled}
            className="arrow"
            aria-label="Next Slide"
          >
            <RiArrowRightSLine />
          </button>
        </div>
      </div>

      <div
        ref={wrapperRef}
        className="apartments_real-estate-card"
        style={{ overflow: "hidden", width: "100%" }}
      >
        <div
          className="cards-track"
          style={{
            display: "flex",
            transform: `translateX(${-currentIndex * CARD_WIDTH}px)`,
            transition: "transform 0.4s ease-out",
          }}
        >
          {(apartments || []).map((item) => {
            // استخدام عملة الشقة إن وجدت وإلا استخدام عملة المدينة الافتراضية
            const currencySymbol = item.currencyKey 
              ? currencies && currencies[item.currencyKey] || cityCurrencySymbol 
              : cityCurrencySymbol;

            return (
              <ApartmentCard 
                key={item.id} 
                item={item} 
                width_card={CARD_WIDTH} 
                currencySymbol={currencySymbol} 
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};