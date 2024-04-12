import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  country: "",
  price: "",
  breed: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCountryFilter: (state, action) => {
      state.country = action.payload;
    },
    setPriceFilter: (state, action) => {
      state.price = action.payload;
    },
    setBreedFilter: (state, action) => {
      state.breed = action.payload;
    },
    clearFilters: (state) => {
      state.country = "";
      state.price = "";
      state.breed = "";
    },
  },
});

export const {
  setCountryFilter,
  setPriceFilter,
  setBreedFilter,
  clearFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
