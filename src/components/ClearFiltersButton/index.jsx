import React from "react";
import "./style.css";
const ClearFiltersButton = ({ onClick }) => (
  <div className="clear-filters">
    <button type="button" onClick={onClick}>
      Clear Filters
    </button>
  </div>
);

export default ClearFiltersButton;
