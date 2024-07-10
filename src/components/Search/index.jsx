import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  return (
    <input
      className="search-box"
      type="search"
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
      onKeyPress={handleSearch}
      placeholder="Search for a country"
    />
  );
};

export default Search;
