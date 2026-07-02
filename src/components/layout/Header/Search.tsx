import { RiSearchLine } from "@remixicon/react";
import { itemButtonSearch } from "./index"
import "./search.scss";

const Search = () => {
  return (
    <div className="search">
        {itemButtonSearch.map(({descraption, title}) => (
            <div key={title} className={`search_btn ${title.trim().toLowerCase()}`}>
                <p>{title}</p>
                <span>{descraption}</span>

                {title == "Who" && <div className="search_icon">
                    <RiSearchLine />
                    </div>}
            </div>
        ))}

    </div>
  )
}

export default Search