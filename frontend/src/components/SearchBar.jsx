import React from "react";

const styles = {
  padding: "10px",
  border: "1px solid black",
  borderRadius: "50px 0 0 50px",
  width: "85%",
};

const SearchBar = ({ search, onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={search}
      style={styles}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};

export default SearchBar;
