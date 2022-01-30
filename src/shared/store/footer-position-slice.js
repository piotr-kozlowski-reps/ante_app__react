import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  windowHeight: 0,
  isFooterToBeMovedToBottom: true,
};

const footerPositionSlice = createSlice({
  name: "footerPosition",
  initialState: initialState,
  reducers: {
    setFooterToBeMovedToBottom(state) {
      state.isFooterToBeMovedToBottom = true;
      // console.log("isFooterToBeMovedToBottom: true");
    },
    setFooterNotToBeMovedToBottom(state) {
      state.isFooterToBeMovedToBottom = false;
      // console.log("isFooterToBeMovedToBottom: false");
    },
    setWindowHeight(state, action) {
      state.windowHeight = action.payload;
      // console.log(`setWindowHeight: ${action.payload}`);
    },
  },
});

export const footerPositionActions = footerPositionSlice.actions;
export default footerPositionSlice;
