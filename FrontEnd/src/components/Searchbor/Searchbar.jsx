import React, { useState } from "react";
import "./Searchbar.css";
import { assets } from "../../assets/assets";

const Searchbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <div className="search-icon">
          <img src={assets.search} alt="Search" />
        </div>
        <input
          type="text"
          placeholder="Search for ticket"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default Searchbar;
