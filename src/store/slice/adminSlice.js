import { createSlice } from "@reduxjs/toolkit";

export const admin = createSlice({
  name: "admin",
  initialState: {
    userActiveMenu: window.sessionStorage.getItem("userActiveMenu")
      ? window.sessionStorage.getItem("userActiveMenu")
      : "/",
    layoutCollapsed: window.sessionStorage.getItem("layoutCollapsed")
      ? typeof window.sessionStorage.getItem("layoutCollapsed") == "string"
        ? JSON.parse(window.sessionStorage.getItem("layoutCollapsed"))
        : window.sessionStorage.getItem("layoutCollapsed")
      : false,
  },
  reducers: {
    userActiveMenu: (state, action) => {
      state.userActiveMenu = action.payload;
      window.sessionStorage.setItem("userActiveMenu", action.payload);
    },
    layoutCollapsed: (state, action) => {
      state.layoutCollapsed = action.payload;
      window.sessionStorage.setItem(
        "layoutCollapsed",
        JSON.stringify(action.payload)
      );
    },

    resetAdmin: (state) => {
      // Reset the state to the initial state
      state.userActiveMenu = "/";
      state.layoutCollapsed = false;

      // Clear local storage
      window.sessionStorage.removeItem("userActiveMenu");
      window.sessionStorage.removeItem("layoutCollapsed");
    },
  },
});

export const { userActiveMenu, layoutCollapsed, resetAdmin } = admin.actions;

export default admin.reducer;
