import type React from "react";
import { useEffect } from "react";

type OutSide = {
  ref: React.RefObject<HTMLDivElement | null>;
  handleDocumentClick: () => void;
  visible?: string | boolean | null;
};

export const useOnclickOutSide = ({ ref, handleDocumentClick, visible }: OutSide) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handleDocumentClick();
        console.log("click")
      }
    };
    if (visible) {
      window.addEventListener("click", handleClick);
    }

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [visible, ref, handleDocumentClick]);
};
