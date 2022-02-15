import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

import App from "../../../App";

const MockApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

describe("Footer", () => {
  it("renders text in polish when state.lang === 'pl' (initial state)", () => {
    render(<MockApp />);

    let companyName = screen.queryByText(/Kozlowski/i);
    let companyAddress = screen.queryByText(/Poland/i);
    let companyPhone = screen.queryByText(/0048/i);

    expect(companyName).not.toBeInTheDocument();
    expect(companyAddress).not.toBeInTheDocument();
    expect(companyPhone).not.toBeInTheDocument();

    companyName = screen.queryByText(/firma Ante Piotr Kozłowsk/i);
    companyAddress = screen.queryByText(/ul\. Hagera 41, 41-800 Zabrze/i);
    companyPhone = screen.queryByText(/691 235 259/i);

    expect(companyName).toBeInTheDocument();
    expect(companyAddress).toBeInTheDocument();
    expect(companyPhone).toBeInTheDocument();
  });

  it("renders text in english when state.lang === 'en'", () => {
    render(<MockApp />);

    const languageButton = screen.getByText(/en/i);
    userEvent.click(languageButton);

    let companyName = screen.queryByText(/firma Ante Piotr Kozłowsk/i);
    let companyAddress = screen.queryByText(/ul\. Hagera 41, 41-800 Zabrze/i);

    expect(companyName).not.toBeInTheDocument();
    expect(companyAddress).not.toBeInTheDocument();

    companyName = screen.queryByText(/Kozlowski/i);
    companyAddress = screen.queryByText(/Poland/i);
    let companyPhone = screen.queryByText(/0048/i);

    expect(companyName).toBeInTheDocument();
    expect(companyAddress).toBeInTheDocument();
    expect(companyPhone).toBeInTheDocument();
  });
});