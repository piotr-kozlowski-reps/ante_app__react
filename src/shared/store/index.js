import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./language-slice";
import authSlice from "./auth-slice";

const store = configureStore({
  reducer: {
    language: languageSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
