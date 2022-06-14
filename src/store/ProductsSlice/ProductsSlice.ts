import { ProductsState } from "./type";
import { createSlice } from "@reduxjs/toolkit";
import fetchProducts from "./action";

const initialState: ProductsState = {
  error: false,
  loading: true,
  count: 0,
  products: [],
};

const ProductsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.error = false;
      state.loading = true;
      state.count = 0;
      state.products = [];
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.error = true;
      state.loading = false;
      state.count = 0;
      state.products = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      state.error = false;
      state.loading = false;
      state.count = payload.count;
      state.products = payload.products;
    });
  },
});

export default ProductsSlice.reducer;
