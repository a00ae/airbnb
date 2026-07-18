import {
  RiArrowLeftSLine,
  RiArrowRightLongLine,
  RiArrowRightSLine,
  RiStarFill,
} from "@remixicon/react";
import "./card.scss";
import itemData from "../../../../data/mockData.json";

const Card = () => {
  return (
    // Father's card
    <section className="card">
      {/* loops section */}
      {itemData.map(({ city, id, apartments, currency }) => (
        // start section
        <div key={id} className="apartments">
          {/* Heading Title Main */}
          <div className="apartments_heading-container">
            <div className="left">
              <h2>Popular homes in {city}</h2>
              <div className="arrow">
                <RiArrowRightLongLine />
              </div>
            </div>
            {/* right */}
            <div className="right">
              <div className="arrow">
                <RiArrowLeftSLine />
              </div>
              <div className="arrow">
                <RiArrowRightSLine />
              </div>
            </div>
          </div>
          {/* loops Card */}
          <div className="apartments_real-estate-card">
            {apartments.map((item) => (
              // card start
              <div key={item.id} className="apartments_real-estate-cards">
                {/* img */}
                <div className="img-cards">
                  <img src={item.img} alt={item.title} />
                </div>
                {/* description */}
                <div className="card-description">
                  {/* Title */}
                  <span data-card-title>{item.title}</span>
                  {/* History */}
                  <span data-card-deta>{item.history} {item.month}</span>
                  {/* price + rating */}
                  <div className="card-description_price">
                    {/* price */}
                    <span data-card-price>{currency}{item.price}</span>
                    {/* rating */}
                    <div className="rating">
                      <RiStarFill />
                      <span>{item.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              // card end
            ))}
          </div>
        </div>
        // end section
      ))}
    </section>
  );
};

export default Card;
