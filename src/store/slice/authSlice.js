import { createSlice } from "@reduxjs/toolkit";

export const admin = createSlice({
  name: "admin",
  initialState: {
    accessToken: window.sessionStorage.getItem("accessToken")
      ? window.sessionStorage.getItem("accessToken")
      : null,
    user: window.sessionStorage.getItem("user")
      ? typeof window.sessionStorage.getItem("user") == "string"
        ? JSON.parse(window.sessionStorage.getItem("user"))
        : window.sessionStorage.getItem("user")
      : null,
  },
  reducers: {
    accessToken: (state, action) => {
      state.accessToken = action.payload;
      window.sessionStorage.setItem("accessToken", action.payload);
    },
    user: (state, action) => {
      state.user = action.payload;
      window.sessionStorage.setItem("user", JSON.stringify(action.payload));
    },

    resetAuth: (state) => {
      // Reset the state to the initial state
      state.accessToken = null;
      state.user = null;

      // Clear local storage
      window.sessionStorage.removeItem("accessToken");
      window.sessionStorage.removeItem("user");
    },
  },
});

export const { accessToken, resetAuth, user } = admin.actions;

export default admin.reducer;
