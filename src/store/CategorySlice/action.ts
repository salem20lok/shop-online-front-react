import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchCategoryState } from "./type";

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async (state: fetchCategoryState, thunkApi) => {
    const { skip, limit } = state;
    try {
      const res = await axios.get("http://localhost:3000/category", {
        params: {
          skip,
          limit,
        },
      });
      return res.data;
    } catch (e) {
      return [];
    }
  }
);
