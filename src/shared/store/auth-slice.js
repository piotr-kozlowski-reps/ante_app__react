import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: true, //TODO: change finaly initial state of isLoggedIn to false
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
