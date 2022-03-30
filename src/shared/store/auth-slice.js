import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: null,
  tokenExpirationDate: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;

      //localStorageData
      const tokenExpirationDate =
        action.payload.expirationDate ||
        new Date(new Date().getTime() + 1000 * 60 * 60);

      localStorage.setItem(
        "userData",
        JSON.stringify({
          login: action.payload.login,
          token: action.payload.token,
          expiration: tokenExpirationDate.toISOString(),
        })
      );

      state.tokenExpirationDate = tokenExpirationDate.toISOString();
      state.token = action.payload.token;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.expirationDate = null;
      localStorage.removeItem("userData");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
