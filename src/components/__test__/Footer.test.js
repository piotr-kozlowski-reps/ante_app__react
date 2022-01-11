import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from '../../shared/utils/test-utils'
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

import App from "../../App";

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
let companyName = screen.queryByText(/firma Ante Piotr Kozłowsk/i)
let companyAddress = screen.queryByText(/ul\. Hagera 41, 41-800 Zabrze/i)
let companyPhone = screen.queryByText(/691 235 259/i)

expect(companyName).toBeInTheDocument()
expect(companyAddress).toBeInTheDocument()
expect(companyPhone).toBeInTheDocument()

const languageButton = screen.getByText(/en/i);
userEvent.click(languageButton)

companyName = screen.queryByText(/firma Ante Piotr Kozłowsk/i)
companyAddress = screen.queryByText(/ul\. Hagera 41, 41-800 Zabrze/i)
companyPhone = screen.queryByText(/691 235 259/i)

expect(companyName).not.toBeInTheDocument()
expect(companyAddress).not.toBeInTheDocument()
expect(companyPhone).toBeInTheDocument()

companyName = screen.queryByText(/ANTE Piotr Kozlowski/i)
companyAddress = screen.queryByText(/Hagera 41, 41-800 Zabrze, Poland/i)
companyPhone = screen.queryByText(/0048 691 235 259/i)

expect(companyName).toBeInTheDocument()
expect(companyAddress).toBeInTheDocument()
expect(companyPhone).toBeInTheDocument()








  });

});
