import { useEffect, type RefObject } from "react";

interface ScrollVisibilityOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean; // لو false سينفذ أنيميشن الخروج والدخول باستمرار
}

export const useScrollVisibility = (
  ref: RefObject<HTMLElement | null>,
  selector?: string,
  options: ScrollVisibilityOptions = {}
) => {
  const { threshold = 0.2, rootMargin = "0px", triggerOnce = false } = options;

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const elements = selector ? Array.from(target.querySelectorAll(selector)) : [target];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // عند الدخول لشاشة العرض
            entry.target.classList.add("is-visible");
            entry.target.classList.remove("is-exiting");

            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else {
            // عند الخروج من شاشة العرض (فقط لو triggerOnce = false)
            if (!triggerOnce && entry.target.classList.contains("is-visible")) {
              entry.target.classList.remove("is-visible");
              entry.target.classList.add("is-exiting");
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [ref, selector, threshold, rootMargin, triggerOnce]);
};