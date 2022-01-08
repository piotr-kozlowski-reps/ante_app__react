import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: "pl",
};

const languageSlice = createSlice({
  name: "language",
  initialState: initialState,
  reducers: {
    setLanguageToPL(state) {
      state.lang = "pl";
    },
    setLanguageToEN(state) {
      state.lang = "en";
    },
  },
});

export const languageActions = languageSlice.actions;
export default languageSlice;
