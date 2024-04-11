import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCountryFilter,
  setPriceFilter,
  clearFilters,
} from "../../features/filters/filtersSlice";
import Cats, { catsPerPage } from "../Cats";
import LoadingAnimation from "../../components/Loading";
import catsData from "../../api/cats.json";
import "./index.css";

const Shop = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(
    parseInt(localStorage.getItem("currentPage"), 10) || 1
  );
  const [filters, setFilters] = useState({
    country: "",
    price: "",
    breed: "",
  });
  const [uniqueCountries, setUniqueCountries] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [inputPage, setInputPage] = useState(page.toString());
  const dispatch = useDispatch();
  const appliedFilters = useSelector((state) => state.filters);

  const filteredCats = Object.values(catsData)
    .filter((cat) => {
      if (filters.country) {
        return cat.location === filters.country;
      }
      return true;
    })
    .filter((cat) => {
      if (filters.price) {
        const [minPrice, maxPrice] = filters.price.split("-").map(parseFloat);
        return cat.price >= minPrice && cat.price <= maxPrice;
      }
      return true;
    });

  const totalPages = Math.ceil(filteredCats.length / catsPerPage);

  const inputRef = useRef(null);

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setPage(pageNum);
    } else {
      setPage(1);
    }
    setInputPage(pageNum.toString());
  };

  useEffect(() => {
    localStorage.setItem("currentPage", page);

    const loadData = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    loadData();

    const countries = Object.values(catsData).map((cat) => cat.location);
    const uniqueCountries = [...new Set(countries)];
    setUniqueCountries(uniqueCountries);

    const prices = Object.values(catsData).map((cat) => cat.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const step = 50;
    const priceRanges = [];
    for (let i = minPrice; i <= maxPrice; i += step) {
      priceRanges.push(`${i}-${i + step}`);
    }
    setPriceRanges(priceRanges);
  }, [page]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

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
            <div className="filters">
              <div className="country-filter">
                <label htmlFor="countryFilter">Country</label>
                <select
                  value={filters.country}
                  onChange={(event) => {
                    const country = event.target.value;
                    dispatch(setCountryFilter(country));
                    dispatch(setPriceFilter(""));
                    setFilters({ ...filters, country, price: "" });
                    setPage(1);
                  }}
                  name="countryFilter"
                >
                  <option value="">All</option>
                  {uniqueCountries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div className="price-filter">
                <label htmlFor="priceSelect">Price</label>
                <select
                  id="priceSelect"
                  value={filters.price}
                  onChange={(event) => {
                    const price = event.target.value;
                    dispatch(setPriceFilter(price));
                    dispatch(setCountryFilter(""));
                    setFilters({ ...filters, price, country: "" });
                    setPage(1);
                  }}
                >
                  <option value="">All</option>
                  {priceRanges.map((range, index) => (
                    <option key={index} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="clear-filters">
              {Object.values(appliedFilters).some((value) => value !== "") && (
                <button
                  type="button"
                  onClick={() => {
                    dispatch(clearFilters());
                    setFilters({ country: "", price: "", breed: "" });
                    setPage(1);
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
            <Cats page={page} filters={filters} />
            <div className="actions">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1} // Disable back button if on first page
              >
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
                      goToPage(pageNumber);
                    }
                  }}
                  style={{ width: "50px" }}
                />
                {" of "}
                {totalPages}
              </span>
              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages} // Disable next button if on last page
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Shop;
