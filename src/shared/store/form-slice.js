import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formStageCounter: 0,
};

export const formSlice = createSlice({
  name: "form",
  initialState: initialState,
  reducers: {
    setNextStage(state) {
      state.formStageCounter++;
    },
    setPreviousStage(state) {
      state.formStageCounter--;
    },
    resetToInitialStage(state) {
      console.log(state);
      state.formStageCounter = initialState.formStageCounter;
    },
  },
});

export const formActions = formSlice.actions;
export default formSlice;
