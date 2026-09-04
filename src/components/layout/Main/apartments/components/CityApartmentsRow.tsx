import { useState, useEffect, useRef } from "react";
import {
  RiArrowLeftSLine,
  RiArrowRightLongLine,
  RiArrowRightSLine,
} from "@remixicon/react";
import type { CityData } from "../types/apartment.types";
import ApartmentCard from "./ApartmentCard";
import { useWindowSize } from "../../../../../hook/useWindowSize"; // 🟢 استيراد الهوك
import { useApartmentsContext } from "../../../../../context/ApartmentsContext";

const CARD_WIDTH = 210;
const CARD_GAP = 20;

interface CityApartmentsRowProps {
  cityData: CityData;
  currencies?: Record<string, string>;
}

export const CityApartmentsRow = ({
  cityData,
  currencies,
}: CityApartmentsRowProps) => {
  const { city, apartments, defaultCurrency } = cityData;


  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [visibleCards, setVisibleCards] = useState<number>(1);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const { width: windowWidth, screenSize } = useWindowSize();
  const cityCurrencySymbol = currencies?.[defaultCurrency] ?? "$";

  // 🟢 حساب دقيق للبطاقات الظاهرة بالكامل
  useEffect(() => {
    if (wrapperRef.current) {
      const wrapperWidth = wrapperRef.current.offsetWidth;
      // المعادلة المحدثة لاحتساب الفجوات بين العناصر
      const count = Math.floor(
        (wrapperWidth + CARD_GAP) / (CARD_WIDTH + CARD_GAP),
      );
      setVisibleCards(count > 0 ? count : 1);
    }
  }, [windowWidth]);

  // إرجاع المؤشر للصفر عند تغيير اتجاه/حجم الشاشة
  useEffect(() => {
    setCurrentIndex(0);
  }, [screenSize]);

  const totalItems = apartments?.length || 0;

  // 🟢 حماية الزر من النقرة الإضافية في النهاية
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled =
    totalItems <= visibleCards || currentIndex >= totalItems - visibleCards;

  // 🟢 دالة التمرير مع حماية إضافية تمنع تجاوز الحد الأقصى
  const nextSlide = () => {
    if (!isNextDisabled) {
      setCurrentIndex((prev) => Math.min(prev + 1, totalItems - visibleCards));
    }
  };

  const prevSlide = () => {
    if (!isPrevDisabled) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const totalTransformXOffset = -currentIndex * (CARD_WIDTH + CARD_GAP);

  return (
    <div className="apartments">
      {/* ... الجزء العلوي للعناوين والأزرار يظل كما هو ... */}

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
            aria-label="Previous Slide">
            <RiArrowLeftSLine />
          </button>
          <button
            onClick={nextSlide}
            disabled={isNextDisabled}
            className="arrow"
            aria-label="Next Slide">
            <RiArrowRightSLine />
          </button>
        </div>
      </div>

      <div
        ref={wrapperRef}
        className="apartments_real-estate-card"
        style={{ overflow: "hidden", width: "100%", paddingLeft: "10px" }}>
        <div
          className="cards-track"
          style={{
            display: "flex",
            gap: `${CARD_GAP}px`,
            transform: `translateX(${totalTransformXOffset}px)`,
            transition: "transform 0.4s ease-out",
          }}>
          {(apartments || []).map((item) => {
            const currencySymbol = item.currencyKey
              ? (currencies && currencies[item.currencyKey]) ||
                cityCurrencySymbol
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
