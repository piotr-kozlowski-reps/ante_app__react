import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
//my reducers
import languageSlice from "../store/language-slice";

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        language: languageSlice.reducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

//re-export
export * from "@testing-library/react";
export { render };
