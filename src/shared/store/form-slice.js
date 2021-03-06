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
    setDesiredStage(state, action) {
      if (action.payload > 2 || action.payload < 0) return;
      state.formStageCounter = action.payload;
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
