import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./filter.scss";

function Filter() {
  const [searchParams, SetSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || 0,
    maxPrice: searchParams.get("maxPrice") || 10000000,
    bedroom: searchParams.get("bedroom") || 1,
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    SetSearchParams(query)
  }

  return (
    <div className="filter">
      <h1>
        Search results for <p>{searchParams.get("city")}</p>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            defaultValue={query.city}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select name="type" id="type" onChange={handleChange} defaultValue={query.type}>
            <option value="any">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Property</label>
          <select name="property" id="property" onChange={handleChange} defaultValue={query.property}>
            <option value="any">any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">land</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">MinPrice</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="any"
            defaultValue={query.minPrice}
            onChange={handleChange}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">MaxPrice</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
            defaultValue={query.maxPrice}
            onChange={handleChange}
          />
        </div>
        <div className="item">
          <label htmlFor="bedroom">Bedroom</label>
          <input type="number" id="bedroom" name="bedroom" placeholder="any" onChange={handleChange} defaultValue={query.bedroom}/>
        </div>

        <button onClick={handleFilter}>
          <img src="/search.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
