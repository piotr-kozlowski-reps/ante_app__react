import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";

import MainNavigation from "../MainNavigation";

const MockMainNavigation = () => {
  return (
    <BrowserRouter>
      <MainNavigation />
    </BrowserRouter>
  );
};

describe("MainNavigation", () => {
  it("renders all links in proper language when state.lang === 'pl' (initial state)", () => {
    render(<MockMainNavigation />);
    let languageButton = screen.getByText(/en/i);
    let projectsButton = screen.getByText(/projekty/i);
    let aboutButton = screen.getByText(/o nas/i);
    let contactButton = screen.getByText(/kontakt/i);
    let loginButton = screen.getByText(/login/i);

    expect(languageButton).toBeInTheDocument();
    expect(projectsButton).toBeInTheDocument();
    expect(aboutButton).toBeInTheDocument();
    expect(contactButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    languageButton = screen.queryByText(/pl/i);
    projectsButton = screen.queryByText(/projects/i);
    aboutButton = screen.queryByText(/about/i);
    contactButton = screen.queryByText(/contact/i);
    loginButton = screen.queryByText(/login/i);

    expect(languageButton).not.toBeInTheDocument();
    expect(projectsButton).not.toBeInTheDocument();
    expect(aboutButton).not.toBeInTheDocument();
    expect(contactButton).not.toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("renders logotype properly", () => {
    render(<MockMainNavigation />);
    const logo = screen.getByRole("img", { name: "Ante logo" });
    expect(logo.src).toContain("ante-logo.png");
  });

  it("renders all links in proper EN language when state.lang changed to 'en'", () => {
    render(<MockMainNavigation />);
    let languageButton = screen.getByText(/en/i);
    userEvent.click(languageButton);

    let projectsButton = screen.getByText(/projects/i);
    let aboutButton = screen.getByText(/about/i);
    let contactButton = screen.getByText(/contact/i);
    let loginButton = screen.getByText(/login/i);

    expect(languageButton).toBeInTheDocument();
    expect(projectsButton).toBeInTheDocument();
    expect(aboutButton).toBeInTheDocument();
    expect(contactButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    languageButton = screen.queryByText(/en/i);
    projectsButton = screen.queryByText(/projekty/i);
    aboutButton = screen.queryByText(/o nast/i);
    contactButton = screen.queryByText(/kontakt/i);

    expect(languageButton).not.toBeInTheDocument();
    expect(projectsButton).not.toBeInTheDocument();
    expect(aboutButton).not.toBeInTheDocument();
    expect(contactButton).not.toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});
