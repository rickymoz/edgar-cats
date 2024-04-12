import React from "react";
import "./style.css";
const FilterDropdown = ({ label, options, value, onChange }) => (
  <div className="filter-dropdown">
    <label htmlFor={label}>{label}</label>
    <select id={label} value={value} onChange={onChange}>
      <option value="">All</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default FilterDropdown;
