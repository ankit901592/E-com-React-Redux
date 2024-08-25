import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, thunkApi) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products/");
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: [],
  searchProduct: "",
  loading: false,
  error: null,
  filterdData: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    handleSearch: (state, action) => {
      state.searchProduct = action.payload;
    },
    updateFilteredProducts: (state, action) => {
      state.filterdData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { handleSearch, updateFilteredProducts } = productSlice.actions;
export const productReducer = productSlice.reducer;

export const selectProducts = (state) => {
  // console.log();

  return state.product.data;
};

export const selectSearchProduct = (state) => state.product.searchProduct;
export const selectfilterProduct = (state) => state.product.filterdData;
export const selectLoading = (state) => state.product.loading;
export const selectError = (state) => state.product.error;
