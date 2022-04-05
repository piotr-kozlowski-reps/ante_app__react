import React from "react";
import { render, screen } from "@testing-library/react";

import BackgroundTopElements from "../BackgroundTopElements";

describe("BackgroundTopElements => presence of animating layers", () => {
  it("renders 3 animating layers divs", () => {
    render(<BackgroundTopElements />);
    const divElements = screen.getAllByTestId("div-animate-element");
    expect(divElements.length).toBe(3);
  });
});
