import { get } from "lodash";

export const getFilters = (store) => get(store, "filters", {});
