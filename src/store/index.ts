import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { useDispatch } from "react-redux";

import ProfileReducer from "./ProfileSlice/ProfileSlice";
import UsersReducer from "./UsersSlice/UsersSlice";
import ProductsReducer from "./ProductsSlice/ProductsSlice";

export const store = configureStore({
  reducer: {
    profile: ProfileReducer,
    users: UsersReducer,
    products: ProductsReducer,
  },
  middleware: [thunkMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: any = () => useDispatch();
