import React, { useState } from "react";
import "./searchBar.css";
const types = ["buy", "rent"];
import search from "../../../public/search.png";
function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });
  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };
  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={`${query.type === type ? "active" : ""} text-black`}
          >
            {type}
          </button>
        ))}
      </div>
      <form className="searchForm">
        <input type="text" name="loaction" placeholder="City Loaction" />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={1000000000}
          placeholder="Min price"
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={1000000000}
          placeholder="Max price"
        />
        <button className="flex items-center justify-center bg-yellow-500">
          <img src={search} alt="" />
        </button>
      </form>
    </div>
  );
}
export default SearchBar;
