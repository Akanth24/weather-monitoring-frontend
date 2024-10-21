import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = ({ placeholder, searchValue, handleSearchChange }) => {
  return (
    <div
      className="input-group"
      style={{
        maxWidth: "400px",
        width: "100%",
        position: "sticky",
        top: "0",
        zIndex: "1000",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "20px",
      }}
    >
      <input
        className="form-control"
        type="search"
        placeholder={placeholder}
        aria-label="Search"
        value={searchValue}
        onChange={handleSearchChange}
        style={{
          border: "none",
          borderRadius: "20px",
          outline: "none",
        }}
      />
    </div>
  );
};

export default Search;