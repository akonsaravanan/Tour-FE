import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/authSlice";
import tourReducer from "../redux/features/tourSlice";

const Store = configureStore({
  reducer: {
    auth: authReducer,
    tour: tourReducer,
  },
});

export default Store;
