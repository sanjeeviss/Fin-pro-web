import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./slice/adminSlice";
import authSlice from "./slice/authSlice";
import filterSlice from "./slice/filterSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    admin: adminSlice,
    filter: filterSlice,
  },
});
