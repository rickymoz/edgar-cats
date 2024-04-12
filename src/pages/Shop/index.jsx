import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCountryFilter,
  setPriceFilter,
  clearFilters,
} from "../../features/filters/filtersSlice";
import Cats, { catsPerPage } from "../Cats";
import LoadingOverlay from "../../components/LoadingOverlay";
import FilterDropdown from "../../components/FilterDropdown";
import ClearFiltersButton from "../../components/ClearFiltersButton";
import Pagination from "../../components/Pagination";
import catsData from "../../api/cats.json";
import "./style.css";

const Shop = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(
    parseInt(localStorage.getItem("currentPage"))
  );
  const [filters, setFilters] = useState({ country: "", price: "", breed: "" });
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
        <LoadingOverlay />
      ) : (
        <div className="survey">
          <div className="header">
            <h2>SHOP</h2>
            <p>EDGAR'S KITTENS</p>
          </div>
          <div className="container">
            <div className="filters">
              <FilterDropdown
                label="Country"
                options={uniqueCountries}
                value={filters.country}
                onChange={(event) => {
                  const country = event.target.value;
                  dispatch(setCountryFilter(country));
                  dispatch(setPriceFilter(""));
                  setFilters({ ...filters, country, price: "" });
                  setPage(1);
                }}
              />
              <FilterDropdown
                label="Price"
                options={priceRanges}
                value={filters.price}
                onChange={(event) => {
                  const price = event.target.value;
                  dispatch(setPriceFilter(price));
                  dispatch(setCountryFilter(""));
                  setFilters({ ...filters, price, country: "" });
                  setPage(1);
                }}
              />
            </div>
            {Object.values(appliedFilters).some((filter) => filter !== "") && (
              <ClearFiltersButton
                onClick={() => {
                  dispatch(clearFilters());
                  setFilters({ country: "", price: "", breed: "" });
                  setPage(1);
                }}
              />
            )}
            <Cats page={page} filters={filters} />
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={goToPage}
              inputPage={inputPage}
              setInputPage={setInputPage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Shop;
