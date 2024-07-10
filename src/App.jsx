import React, { useState, useEffect, useRef } from "react";
import Search from "./components/Search";
import Table from "./components/Table";

const App = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeyboardShortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "/") {
        event.preventDefault();
        searchInputRef.current && searchInputRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleKeyboardShortcut);

    return () => {
      document.removeEventListener("keydown", handleKeyboardShortcut);
    };
  }, [searchInputRef]);

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${searchTerm}?limit=${limit}`
      );
      const data = await response.json();
      setResults(data);
      setTotalPages(Math.ceil(data.length / limit));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    setSearchTerm(searchTerm);
  };

  const handleLimitChange = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    if (newLimit >= 5 && newLimit <= 10) {
      setLimit(newLimit);
      handleSearch(searchInputRef.current.value);
    } else {
      alert("Please enter a limit between 5 and 10.");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    handleSearch(searchTerm);
  };

  return (
    <div className="main-section">
      <Search ref={searchInputRef} onSearch={handleSearch} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Table
            results={results.slice(
              (currentPage - 1) * limit,
              currentPage * limit
            )}
          />
          <div className="pagination">
            {results.length > 0 && (
              <>
                <input
                  type="number"
                  value={limit}
                  onChange={handleLimitChange}
                  min={5}
                  max={10}
                />
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
