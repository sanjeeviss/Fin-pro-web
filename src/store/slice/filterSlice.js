import { createSlice } from "@reduxjs/toolkit";

export const filter = createSlice({
  name: "filter",
  initialState: {
    filterAgent: window.localStorage.getItem("filterAgent")
      ? typeof window.localStorage.getItem("filterAgent") == "string"
        ? JSON.parse(window.localStorage.getItem("filterAgent"))
        : window.localStorage.getItem("filterAgent")
      : [],
    filterRoute: window.localStorage.getItem("filterRoute")
      ? typeof window.localStorage.getItem("filterRoute") == "string"
        ? JSON.parse(window.localStorage.getItem("filterRoute"))
        : window.localStorage.getItem("filterRoute")
      : [],
    filterTenur: window.localStorage.getItem("filterTenur")
      ? typeof window.localStorage.getItem("filterTenur") == "string"
        ? JSON.parse(window.localStorage.getItem("filterTenur"))
        : window.localStorage.getItem("filterTenur")
      : [],
  },
  reducers: {
    filterAgent: (state, action) => {
      state.filterAgent = action.payload;
      window.localStorage.setItem(
        "filterAgent",
        JSON.stringify(action.payload)
      );
    },
    filterRoute: (state, action) => {
      state.filterRoute = action.payload;
      window.localStorage.setItem(
        "filterRoute",
        JSON.stringify(action.payload)
      );
    },
    filterTenur: (state, action) => {
      state.filterTenur = action.payload;
      window.localStorage.setItem(
        "filterTenur",
        JSON.stringify(action.payload)
      );
    },

    resetFilter: (state) => {
      // Reset the state to the initial state
      state.filterAgent = [];
      state.filterRoute = [];
      state.filterTenur = [];

      // Clear local storage
      window.localStorage.removeItem("filterAgent");
      window.localStorage.removeItem("filterRoute");
      window.localStorage.removeItem("filterTenur");
    },
  },
});

export const { filterAgent, filterRoute, filterTenur, resetFilter } =
  filter.actions;

export default filter.reducer;
