import React, { useState } from "react";
import catsData from "../../api/cats.json";
import "./style.css";
import Modal from "../../components/Modal";

export const catsPerPage = 6;

const Cats = ({ page }) => {
  const startIndex = (page - 1) * catsPerPage;
  const endIndex = startIndex + catsPerPage;
  const cats = Object.values(catsData).slice(startIndex, endIndex);

  const [selectedCat, setSelectedCat] = useState(null);

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
          className="cat-info"
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
