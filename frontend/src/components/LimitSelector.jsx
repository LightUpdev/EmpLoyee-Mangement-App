import React from "react";

const styles = {
  padding: "10px",
  border: "1px solid black",
  borderRadius: "0 50px 50px 0",
  width: "15%",
};

const LimitSelector = ({ limit, onLimitChange }) => {
  return (
    <input
      type="number"
      value={limit}
      style={styles}
      onChange={(e) => onLimitChange(Number(e.target.value))}
      placeholder="Limit"
    />
  );
};

export default LimitSelector;
