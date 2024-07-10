import React, { useState, useEffect, useRef } from "react";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "/") {
        searchInputRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, []);

  return (
    <div clascName="search">
      <input
        className="search-box"
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyPress={handleSearch}
        placeholder="Search for a country"
        ref={searchInputRef}
      />
      <div className="input-instruction">CTRL+/</div>
    </div>
  );
};

export default Search;
