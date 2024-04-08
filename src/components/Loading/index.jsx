import React from "react";
import "./style.css";

const LoadingAnimation = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading Edgar's kittens...</p>
    </div>
  );
};

export default LoadingAnimation;
