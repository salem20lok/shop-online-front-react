import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchProductsState } from "./type";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/productsFetch",
  async (state: FetchProductsState, thunkApi) => {
    const { skip, limit } = state;
    try {
      const res = await axios.get("http://localhost:3000/product", {
        params: {
          limit: limit,
          skip: skip,
        },
      });
      return res.data;
    } catch (e) {
      return [];
    }
  }
);

export default fetchProducts;
