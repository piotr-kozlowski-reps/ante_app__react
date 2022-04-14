import React from "react";
import { render, screen, cleanup } from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { server, rest } from "../../../../mocks/server";

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

describe("Footer", () => {
  it("should render footer in both languages.", () => {
    render(<MockApp />);
    resetLanguageToPolish();

    expect(screen.getByText(`firma Ante Piotr Kozłowski`)).toBeInTheDocument();
    expect(screen.getByText(`691 235 259`)).toBeInTheDocument();

    //en
    changeLanguageToEn();

    expect(screen.getByText(`ANTE Piotr Kozlowski`)).toBeInTheDocument();
  });
});

function changeLanguageToEn() {
  const langButton = screen.getByRole("button", {
    name: "EN",
  });
  userEvent.click(langButton);
}

function resetLanguageToPolish() {
  if (
    !screen.queryByRole("link", {
      name: /o nas/i,
    })
  ) {
    const langButton = screen.queryByRole("button", {
      name: /pl/i,
    });
    userEvent.click(langButton);
  }
}
