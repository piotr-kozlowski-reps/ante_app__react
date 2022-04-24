import React from "react";
import { render, screen, cleanup } from "../../../shared/utils/test-utils";
import { BrowserRouter, useNavigate } from "react-router-dom";

import ProjectShowcaseFooter from "../ProjectShowcaseFooter";
import userEvent from "@testing-library/user-event";

const MockProjectShowcaseFooter = ({ lang }) => {
  return (
    <BrowserRouter>
      <ProjectShowcaseFooter lang={lang} />
    </BrowserRouter>
  );
};

// mock useNavigate
const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

describe("ProjectShowcaseFooter", () => {
  it("renders back_button in pl", () => {
    render(<MockProjectShowcaseFooter lang="pl" />);
    expect(
      screen.getByRole("button", {
        name: /powrót do projektów/i,
      })
    ).toBeInTheDocument();
  });

  it("renders calls useNavigate when clicked", async () => {
    render(<MockProjectShowcaseFooter lang="pl" />);

    const buttonBack = screen.getByRole("button", {
      name: /powrót do projektów/i,
    });
    expect(buttonBack).toBeInTheDocument();
    userEvent.click(buttonBack);

    await expect(mockUsedNavigate).toBeCalledTimes(1);
  });

  it("renders back_button in en", async () => {
    render(<MockProjectShowcaseFooter lang="en" />);
    const buttonBack = screen.getByRole("button", {
      name: /back to projects/i,
    });
    expect(buttonBack).toBeInTheDocument();
    userEvent.click(buttonBack);

    await expect(mockUsedNavigate).toBeCalledTimes(1);
  });
});
