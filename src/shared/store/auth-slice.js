import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: null,
  tokenExpirationDate: null,
  login: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.login = action.payload.login;
      if (action.payload.userId) {
        state.userId = action.payload.userId;
      }
      state.tokenExpirationDate = action.payload.expirationDate;
    },
    logout(state) {
      console.log("logout");
      state.isLoggedIn = false;
      state.token = null;
      state.tokenExpirationDate = null;
      state.login = null;
      state.userId = null;
      localStorage.removeItem("userData");
    },
  },
});

export const logoutPostponed = () => {
  console.log("thunk logoutPostponed");
  authSlice.actions.logout();
  // return (dispatch) => {
  //   console.log("thunk logoutPostponed dispatch");
  //   dispatch(authActions.logout());
  // };
};

export const authActions = authSlice.actions;
export default authSlice;
