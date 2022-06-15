import { CategoryState } from "./type";
import { createSlice } from "@reduxjs/toolkit";
import { fetchCategory } from "./action";

const installState: CategoryState = {
  count: 0,
  category: [],
  loading: true,
  error: false,
};

const CategorySlice = createSlice({
  name: "category",
  initialState: installState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.pending, (state) => {
      state.error = false;
      state.loading = true;
      state.count = 0;
      state.category = [];
    });
    builder.addCase(fetchCategory.rejected, (state) => {
      state.error = true;
      state.loading = false;
      state.count = 0;
      state.category = [];
    });
    builder.addCase(fetchCategory.fulfilled, (state, { payload }) => {
      state.error = false;
      state.loading = false;
      state.count = payload.count;
      state.category = payload.categories;
    });
  },
});

export default CategorySlice.reducer;
