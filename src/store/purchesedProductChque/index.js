import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to fetch purchased products
export const fetchUserPurchases = createAsyncThunk(
  "userPurchases/fetchUserPurchases",
  async (userId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL_SERVER}fetchUserPurchaseProducts/${userId}`);
      // console.log(response)
      return response.data.purchases;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const postReviewText = createAsyncThunk(
    "userPurchases/postReviewText",
    async (review) => {
      try {
        // console.log("review",review)
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL_SERVER}api/reviews/postreviewstext`,
          review // Send the review object
        );
        // console.log("Response from server:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error sending review:", error);
      }
    }
  );
  

const userPurchaseSlice = createSlice({
  name: "userPurchases",
  initialState: {
    purchases: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPurchases.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserPurchases.fulfilled, (state, action) => {
        state.isLoading = false;
        state.purchases = action.payload;
      })
      .addCase(fetchUserPurchases.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userPurchaseSlice.reducer;
