import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import AdminProductsSlice from "./products-slice/index";
import shopProductSlice  from "../store/shop/productSlice"
import shopCartSlice from "../store/cart-slice/index"
import addressSlice from "./address-slice/index"

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts : AdminProductsSlice,
    shoppingProducts: shopProductSlice,
    shoppingCart: shopCartSlice,
    shopAddress : addressSlice
  },
});

export default store;
