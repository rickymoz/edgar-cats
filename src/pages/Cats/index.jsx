import React, { useState } from "react";
import catsData from "../../api/cats.json";
import Modal from "../../components/Modal";
import { useSelector } from "react-redux";
import "./style.css";

export const catsPerPage = 10;

const Cats = ({ page }) => {
  const [selectedCat, setSelectedCat] = useState(null);
  const filters = useSelector((state) => state.filters);

  const startIndex = (page - 1) * catsPerPage;
  const endIndex = startIndex + catsPerPage;

  let filteredCats = Object.values(catsData);

  if (filters.country) {
    filteredCats = filteredCats.filter(
      (cat) => cat.location === filters.country
    );
  }

  if (filters.price) {
    const [minPrice, maxPrice] = filters.price.split("-").map(parseFloat);
    filteredCats = filteredCats.filter(
      (cat) => cat.price >= minPrice && cat.price <= maxPrice
    );
  }

  const cats = filteredCats.slice(startIndex, endIndex);

  const handleCatClick = (cat) => {
    setSelectedCat(cat);
  };

  const closeModal = () => {
    setSelectedCat(null);
  };

  return (
    <div className="cats-container">
      {cats.map((cat, index) => (
        <div
          className="cats-info"
          key={index}
          onClick={() => handleCatClick(cat)}
        >
          <img src={cat.image} alt={cat.name} />
          <p>{cat.name}</p>
        </div>
      ))}
      {selectedCat && <Modal cat={selectedCat} onClose={closeModal} />}
    </div>
  );
};

export default Cats;
