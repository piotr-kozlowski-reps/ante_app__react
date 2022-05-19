import React, { Fragment } from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

//my reducers
import languageSlice from "../store/language-slice";
import authSlice from "../store/auth-slice";
import footerPositionSlice from "../store/footer-position-slice";
import formSlice from "../store/form-slice";

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        language: languageSlice.reducer,
        auth: authSlice.reducer,
        footerPosition: footerPositionSlice.reducer,
        form: formSlice.reducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Fragment>
          <div id="loading-hook"></div>
          <div id="backdrop-hook"></div>
          <div id="modal-hook"></div>
          {children}
        </Fragment>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

//re-export
export * from "@testing-library/react";
export { render };
