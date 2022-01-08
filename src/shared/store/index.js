import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./language-slice";

const store = configureStore({
  reducer: {
    language: languageSlice.reducer,
  },
});

export default store;
