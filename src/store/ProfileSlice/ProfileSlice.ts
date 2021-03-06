import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveProfilePayload, UserState } from "./type";

const initialState: UserState = {
  error: true,
  loading: false,
  profile: {
    _id: "",
    avatar: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phone: "",
    role: [],
  },
};

const ProfileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    saveProfile: (state, action: PayloadAction<saveProfilePayload>) => {
      state.profile = action.payload.profile;
      state.error = false;
      state.loading = false;
    },
    removeProfile: (state) => {
      state = initialState;
    },
  },
});

export const { saveProfile, removeProfile } = ProfileSlice.actions;

export default ProfileSlice.reducer;
