import React, { useState, useEffect } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Cats, { catsPerPage } from "../Cats";
import LoadingAnimation from "../../components/Loading";
import catsData from "../../api/cats.json";
import "./index.css";

const Shop = () => {
  const [page, setPage] = useState(1);
  const cats = Object.values(catsData);
  const maxPage = Math.ceil(cats.length / catsPerPage);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <>
      {loading ? (
        <div className="modal-overlay">
          <div className="loading-overlay">
            <LoadingAnimation />
          </div>
        </div>
      ) : (
        <div className="survey">
          <div className="header">
            <h2>SHOP</h2>
            <p>EDGAR'S KITTENS</p>
          </div>
          <div className="container">
            <div className="actions">
              {page > 1 && (
                <button type="button" onClick={prevPage}>
                  <GrFormPrevious />
                  <span>BACK</span>
                </button>
              )}
              {page < maxPage && (
                <button type="button" onClick={nextPage}>
                  <span>NEXT</span>
                  <GrFormNext />
                </button>
              )}
            </div>
            <div>
              <Cats page={page} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Shop;
