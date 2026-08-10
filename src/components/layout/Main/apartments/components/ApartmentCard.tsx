import { RiStarFill } from "@remixicon/react";
import type { Apartment } from "../types/apartment.types";

type Props = {
  width_card: number;
  item: Apartment;
  currencySymbol: string;
};

const ApartmentCard = ({ width_card, item, currencySymbol }: Props) => {
  return (
    <div
      className="apartments_real-estate-cards"
      style={{ flexShrink: 0, width: `${width_card}px` }}
    >
      <div className="img-cards">
        <img
          src={`${import.meta.env.BASE_URL}${item.img}`}
          alt={item.title}
          loading="lazy"
        />
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