import React from "react";
import { render, screen, cleanup } from "../../../shared/utils/test-utils";
import { BrowserRouter } from "react-router-dom";

import App from "../../../App";

const MockApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

afterEach(() => {
  cleanup();
});

describe("ProjectsTypeNavigation", () => {
  it("renders title PORTFOLIO", () => {
    render(<MockApp />);
    expect(
      screen.getByRole("heading", {
        name: /portfolio/i,
      })
    ).toBeInTheDocument();
  });

  it("renders wszytskie/all in proper language when needed", () => {
    render(<MockApp />);
    expect(
      screen.getByRole("link", {
        name: /wszystkie/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /wszystkie/i,
      })
    ).toHaveAttribute("class", "main-nav-link  main-nav-link-active active");
  });
});
