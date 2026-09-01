import { RiStarFill } from "@remixicon/react";
import type { Apartment } from "../types/apartment.types";
import type React from "react";
import { useState } from "react";

type Props = {
  width_card: number;
  item: Apartment;
  currencySymbol: string;
};

const ApartmentCard = ({ width_card, item, currencySymbol }: Props) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  return (
    <div
      className="apartments_real-estate-cards"
      style={
        {
          "--card-width": `${width_card}px`,
          "--card-img-height": "210px",
        } as React.CSSProperties
      }>
      <div className="img-cards">
        <img
          src={`${import.meta.env.BASE_URL}${item.img}`}
          alt={item.title}
          loading="lazy"
        />
        <div onClick={() => setIsLike(!isLike)} className="svg">
          <i
            className={isLike ? "ri-poker-hearts-fill" : "ri-poker-hearts-line"}
            style={{ color: isLike ? "red" : "white", fontSize: 25 }}></i>
        </div>
      </div>
      <div className="card-description">
        <span data-card-title>{item.title}</span>
        <span data-card-deta>
          {item.history} {item.month}
        </span>
        <div className="card-description_price">
          <span data-card-price>
            {currencySymbol} {item.price} total
          </span>
          <div className="rating">
            <RiStarFill />
            <span>{item.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;
