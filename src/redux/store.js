import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/authSlice';
import { authApi } from "../api/authApi";
import { hospitalApi } from "../api/hospitalApi";
import { bloodRequestApi } from "../api/bloodRequestApi";

const initialState = { theme: "dark" };

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [hospitalApi.reducerPath]: hospitalApi.reducer,
    [bloodRequestApi.reducerPath]: bloodRequestApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(hospitalApi.middleware)
      .concat(bloodRequestApi.middleware),
});
