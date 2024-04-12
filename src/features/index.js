import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filters/filtersSlice";

const store = configureStore({
  reducer: {
    filters: filtersReducer,
  },
});

export default store;
