import React from "react";
import { render, screen } from "../../shared/utils/test-utils";
import { BrowserRouter } from "react-router-dom";

import About from "../About";

describe(`ABOUT -> tdd approach`, () => {
  it("renders header", () => {
    render(<About initialValue={}/>);
    expect(screen.getByText("O nas")).toBeInTheDocument();
  });
});
