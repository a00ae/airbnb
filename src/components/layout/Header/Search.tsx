import { RiSearchLine } from "@remixicon/react";
import { dataWhere, itemButtonSearch } from "./index";
import "./search.scss";
import { useEffect, useRef, useState } from "react";
import { useOnclickOutSide } from "../../../hook/useOnclickOutSide";
import DropDown from "../../ui/Dialog/Drop-down";

type Props = {
  visible: boolean;
};

/*This section is the search section located in the Header. */

const Search = ({ visible }: Props) => {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [increment, setIncrement] = useState<number>(0);
  // const [active, setAcive] = useState<string | null>(null);
  /* Take a reference from the element */
  const ref = useRef<HTMLDivElement | null>(null);

  //* If there is no element, return a blank space. */
  const handleClicOutSide = () => {
    setActiveLabel(null);
  };

  /* Hook catches external clicks */
  useOnclickOutSide({
    ref: ref,
    handleDocumentClick: handleClicOutSide,
    visible: activeLabel,
  });

  /* If the external window is opened*/

  useEffect(() => {
    if (visible) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveLabel(null);
    }
  }, [visible]);

  /*A function to change the state of an element from*/
  const handleClickSearch = (label: string) => {
    setActiveLabel((prev) => (prev === label ? null : label));
  };
  /* If there is no element, return null. */
  if (!ref) return null;

  return (
    <div ref={ref} className="search">
      {/* This is the parent element, and from here come the offspring elements. */}
      {itemButtonSearch.map(({ descraption, title }) => {
        /* To revert the address value to lowercase letters without spaces */
        const currentTitleLower: string = title.trim().toLowerCase();
        /* Store a verification status for swapping items */
        const isCurrentActive: boolean = activeLabel === title;
        /*Create three search buttons in the UI*/
        return (
          <div
            onClick={() => handleClickSearch(title)}
            key={title}
            className={`search_btn ${currentTitleLower} ${isCurrentActive ? "visible" : ""}`}>
            <p>{title}</p>
            <span>{descraption}</span>

            {title === "Who" && (
              <div className="search_icon">
                <RiSearchLine />
              </div>
            )}
          </div>
        );
      })}
        {/* One-button search for small screens */}
      <div className="search_input">
        <RiSearchLine />
        <span data-search>Start yuor searh</span>
      </div>
      {/* Create a drop-down list and change its status according to user clicks. */}
      <DropDown className={!activeLabel ? "" : activeLabel}>
        {dataWhere
          .filter((item) => item.type === activeLabel?.toLowerCase().trim())
          .map((item, i) => {
            return (
              <div key={i} className={`child-${item.type}`}>
                {/* قسم الوجهات - Where  - Destinations section*/}
                {item.type === "where" && (
                  <>
                    <span>Suggested destinations</span>
                    {item.whereData?.map(
                      ({
                        id,
                        iconDataWhere,
                        titleDataWhere,
                        descraptionDataWhere,
                        bgColor,
                      }) => (
                        <div key={id} className="where_card-btn">
                          <div
                            style={{ backgroundColor: bgColor }}
                            className="svg">
                            {iconDataWhere}
                          </div>
                          <div className="card_descraption">
                            <span>{titleDataWhere}</span>
                            <p>{descraptionDataWhere}</p>
                          </div>
                        </div>
                      ),
                    )}
                  </>
                )}

                {/* قسم الأشخاص - Who - People section*/}
                {item.type === "who" && (
                  <>
                    {item.whoData?.map((who, index) => (
                      <div key={index} className="who_card-btn">
                        <div className="who-descraption">
                          <span>{who.titleDataWho}</span>
                          <p>{who.descraptionDataWho}</p>
                        </div>
                        <div className="who-number">
                          <span
                            onClick={() => setIncrement(increment - 1)}
                            className="discriment">
                            —
                          </span>
                          <span className="valued">{increment}</span>
                          <span
                            onClick={() => setIncrement(increment + 1)}
                            className="increment">
                            +
                          </span>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            );
          })}
      </DropDown>
    </div>
  );
};

export default Search;
