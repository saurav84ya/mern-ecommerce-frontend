import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
  error: null, // Add error to track errors
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "products/fetchAllFilteredProducts", // Unique type prefix
  async ({ query, sort }) => {
    try { 
      const queryString = `?${query}&sort=${sort}`;
      // console.log(queryString);

      const result = await axios.get(
        `${import.meta.env.VITE_API_URL_SERVER}api/user/products/get${queryString}`
      );
      return result?.data;
    } catch (error) {
      console.log(error);
      throw error; // Rethrow error for rejected case
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails", // Unique type prefix
  async (id) => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL_SERVER}api/user/products/get/${id}`
      );
      return result?.data;
    } catch (error) {
      console.log(error);
      throw error; // Rethrow error for rejected case
    }
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails : (state) => {
      state.productDetails = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
        state.error = null;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        state.error = action.error.message || "Failed to fetch products.";
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
        state.error = null;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
        state.error = action.error.message || "Failed to fetch product details.";
      });
  },
});

export const {setProductDetails} = shoppingProductSlice.actions

export default shoppingProductSlice.reducer;
