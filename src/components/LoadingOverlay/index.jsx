import React from "react";
import LoadingAnimation from "../../components/Loading";

const LoadingOverlay = () => (
  <div className="modal-overlay">
    <div className="loading-overlay">
      <LoadingAnimation />
    </div>
  </div>
);

export default LoadingOverlay;
