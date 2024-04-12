import React, { useRef, useEffect } from "react";
import "./style.css";

const Pagination = ({
  page,
  totalPages,
  onPageChange,
  inputPage,
  setInputPage,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft" && page > 1) {
        onPageChange(page - 1);
      } else if (event.key === "ArrowRight" && page < totalPages) {
        onPageChange(page + 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [page, totalPages, onPageChange]);

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        {"<"}
      </button>
      <span>
        <input
          ref={inputRef}
          type="number"
          value={inputPage}
          onChange={(e) => {
            setInputPage(e.target.value);
            const pageNumber = parseInt(e.target.value, 10);
            if (!isNaN(pageNumber)) {
              onPageChange(pageNumber);
            }
          }}
          style={{ width: "50px" }}
        />
        {" of "}
        {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
