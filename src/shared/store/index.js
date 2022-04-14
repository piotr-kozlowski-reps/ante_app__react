import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./language-slice";
import authSlice from "./auth-slice";
// import footerPositionSlice from "./footer-position-slice";
import formSlice from "./form-slice";

const store = configureStore({
  reducer: {
    language: languageSlice.reducer,
    auth: authSlice.reducer,
    // footerPosition: footerPositionSlice.reducer,
    form: formSlice.reducer,
  },
});

export default store;
