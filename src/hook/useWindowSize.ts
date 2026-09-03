import { useState, useEffect } from "react";

// تعريف الأحجام المعيارية (Breakpoints)
export type ScreenSize = "mobile" | "tablet" | "desktop" | "largeDesktop";

interface WindowSizeState {
  width: number;
  height: number;
  screenSize: ScreenSize;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
}

const getScreenSize = (width: number): ScreenSize => {
  if (width < 700) return "mobile";
  if (width < 991) return "tablet";
  if (width < 1280) return "desktop";
  return "largeDesktop";
};

export const useWindowSize = (): WindowSizeState => {
  const [windowSize, setWindowSize] = useState<WindowSizeState>(() => {
    const width = typeof window !== "undefined" ? window.innerWidth : 0;
    const height = typeof window !== "undefined" ? window.innerHeight : 0;
    const screenSize = getScreenSize(width);

    return {
      width,
      height,
      screenSize,
      isMobile: screenSize === "mobile",
      isTablet: screenSize === "tablet",
      isDesktop: screenSize === "desktop",
      isLargeDesktop: screenSize === "largeDesktop",
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const screenSize = getScreenSize(width);

      // هذا الإجراء يجبر مكونات React على Re-render عند تغير مقاس الشاشة
      setWindowSize({
        width,
        height,
        screenSize,
        isMobile: screenSize === "mobile",
        isTablet: screenSize === "tablet",
        isDesktop: screenSize === "desktop",
        isLargeDesktop: screenSize === "largeDesktop",
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};