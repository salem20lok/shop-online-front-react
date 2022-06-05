import { UsersState } from "./type";
import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./action";

const initialState: UsersState = {
  error: false,
  loading: false,
  count: 0,
  users: [],
};

const UsersSlice = createSlice({
  name: "Users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.rejected, (state) => {});
    builder.addCase(fetchUsers.pending, (state) => {
      state.error = false;
      state.loading = true;
      state.users = [];
      state.count = 0;
    });
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.error = false;
      state.loading = false;
      state.users = payload.users;
      state.count = payload.count;
    });
  },
});

export default UsersSlice.reducer;
