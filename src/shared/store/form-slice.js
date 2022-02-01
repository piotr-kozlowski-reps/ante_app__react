import { createSlice } from "@reduxjs/toolkit";
import { generateProject } from "../utils/projectFactory";
import genre from "../utils/genre";

const initialState = {
  formStageCounter: 0,
  genreOfProject: null,
  projectAnimation: {},
  projectApp: {},
  projectGraphic: {},
  projectPanorama: {},
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
    initProjectTemplate(state, action) {
      switch (action.payload) {
        case genre.GRAPHIC:
          state.projectGraphic = generateProject(action.payload);
          console.log(state.projectGraphic);
          break;
        case genre.APP:
          state.projectApp = generateProject(action.payload);
          console.log(state.projectApp);
          break;
        case genre.ANIMATION:
          state.projectAnimation = generateProject(action.payload);
          console.log(state.projectAnimation);
          break;
        case genre.PANORAMA:
          state.projectPanorama = generateProject(action.payload);
          console.log(state.projectPanorama);
          break;
        default:
          state.projectGraphic = generateProject(genre.GRAPHIC);
      }
    },
  },
});

export const formActions = formSlice.actions;
export default formSlice;

//stan wyboru genre projektu
//initial stany poszczegolnych genre - by moznabylo do nich wrocic
//metoda reset kazdego z genre
//pobieranie kazdego po wybraniu genre projektu
//setkazdego obiektu z poszczegolnymi wlasciwosciami
