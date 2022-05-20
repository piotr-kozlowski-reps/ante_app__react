import React from "react";
import {
  render,
  screen,
  cleanup,
  within,
} from "../../../shared/utils/test-utils";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import FormikContainer from "../FormikContainer";
import { generateStringWithPath } from "../FormikContainer";

const MockFormikContainer = () => {
  return (
    <BrowserRouter>
      <FormikContainer />
    </BrowserRouter>
  );
};

afterEach(() => {
  cleanup();
});

describe("FormikContainer", () => {
  it("should generate path to object properties from given array", () => {
    render(<MockFormikContainer />);

    // const result = generateStringWithPath([""]);
  });
});
