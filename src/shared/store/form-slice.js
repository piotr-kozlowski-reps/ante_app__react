import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formStageCounter: 0,
  genreOfProject: null,
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
      state.formStageCounter = initialState.formStageCounter;
    },
    setGenreOfProject(state, action) {
      state.genreOfProject = action.payload;
    },
    resetGenreOfProjectToNull(state) {
      state.genreOfProject = null;
    },
  },
});

export const formActions = formSlice.actions;
export default formSlice;
