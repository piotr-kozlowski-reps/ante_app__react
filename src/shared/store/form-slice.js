import { createSlice } from "@reduxjs/toolkit";
import { generateProjectForForm } from "../utils/projectForFormFactory";
import genre from "../utils/genre";

const initialState = {
  formStageCounter: 0,
  genreOfProject: null,
  projectState: null,
  isFormValid: false,
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
    initProjectTemplate(state, action) {
      switch (action.payload) {
        case genre.GRAPHIC:
          state.projectState = generateProjectForForm(action.payload);
          // console.log(state.projectState);
          break;
        case genre.APP:
          state.projectState = generateProjectForForm(action.payload);
          // console.log(state.projectState);
          break;
        case genre.ANIMATION:
          state.projectState = generateProjectForForm(action.payload);
          // console.log(state.projectState);
          break;
        case genre.PANORAMA:
          state.projectState = generateProjectForForm(action.payload);
          // console.log(state.projectState);
          break;
        default:
          state.projectState = generateProjectForForm(genre.GRAPHIC);
        // console.log(state.projectState);
      }
    },
    setFormInputs(state, actions) {
      state.projectState = actions.payload;
    },
    setFormOverallValidity(state, actions) {
      state.isFormValid = actions.payload;
    },
  },
});

export const formActions = formSlice.actions;
export default formSlice;

//initial stany poszczegolnych genre - by moznabylo do nich wrocic
//metoda reset kazdego z genre
//setkazdego obiektu z poszczegolnymi wlasciwosciami
