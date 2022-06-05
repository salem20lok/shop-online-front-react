import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsersState } from "./type";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (state: fetchUsersState, thunkApi) => {
    const { skip, limit } = state;
    try {
      const res = await axios.get("http://localhost:3000/user", {
        params: {
          limit: limit,
          skip: skip,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return res.data;
    } catch (e) {
      return [];
    }
  }
);
