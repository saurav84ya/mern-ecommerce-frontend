import axios from "axios"

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


const initialState = {
    isLoading : false ,
    productList : []
}

export const fetchAllFilteredProducts = createAsyncThunk(
    "products/fetchAllProducts",
    async () => {
        const result = await axios.get(
            `${import.meta.env.VITE_API_URL_SERVER}api/user/products/get`
        )
        return result?.data;
    }
)


const shoppingProductSlice = createSlice({
    name : 'shoppingProducts',
    initialState,
    reducers : {},
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
            state.error = action.payload || "Failed to fetch products.";
          });
      },
})

export default shoppingProductSlice.reducer