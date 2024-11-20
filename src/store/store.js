import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import AdminProductsSlice from "./products-slice/index";
import shopProductSlice  from "../store/shop/productSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts : AdminProductsSlice,
    shopProducts: shopProductSlice
  },
});

export default store;
