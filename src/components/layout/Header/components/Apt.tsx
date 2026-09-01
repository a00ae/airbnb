import { useRef } from "react";
import { useScrollVisibility } from "../../../../hook/useScrollVisibility";

const Apt = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useScrollVisibility(ref, undefined, { threshold: 0.1, triggerOnce: false });
  return (
    <div
      className="apt"
      ref={ref}
      style={{
        width: "100%",
        height: "1px",
        backgroundColor: "var(--card-bg)",
      }}></div>
  );
};

export default Apt;
