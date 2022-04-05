import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, cleanup } from "../../utils/test-utils";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";

//mock localStorage

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

describe("MainNavigation", () => {
  it("renders logotype properly", () => {
    render(<MockApp />);
    const logo = screen.getByRole("img", { name: "Ante logo top" });
    expect(logo.src).toContain("ante-logo.png");
  });
  it("renders PL links when not logged in", () => {
    render(<MockApp />);
    let loginButton = screen.queryByRole("link", { name: "Login" });
    let contactButton = screen.queryByRole("link", { name: "Kontakt" });
    let aboutButton = screen.queryByRole("link", { name: "O nas" });
    let projectsButton = screen.queryByRole("link", { name: "Projekty" });
    let langButton = screen.queryByRole("button", { name: "EN" });

    expect(loginButton).toBeInTheDocument();
    expect(contactButton).toBeInTheDocument();
    expect(aboutButton).toBeInTheDocument();
    expect(projectsButton).toBeInTheDocument();
    expect(langButton).toBeInTheDocument();

    langButton = screen.queryByText("PL");
    projectsButton = screen.queryByText(/projects/i);
    aboutButton = screen.queryByText(/about/i);
    contactButton = screen.queryByText(/contact/i);
    loginButton = screen.queryByText(/login/i);

    expect(loginButton).toBeInTheDocument();
    expect(contactButton).not.toBeInTheDocument();
    expect(aboutButton).not.toBeInTheDocument();
    expect(projectsButton).not.toBeInTheDocument();
    expect(langButton).not.toBeInTheDocument();
  });

  it(`renders EN links when not logged in and button "EN" clicked`, () => {
    render(<MockApp />);
    let langButtonPl = screen.queryByRole("button", { name: "PL" });
    let loginButton = screen.queryByRole("link", { name: "Login" });
    let contactButtonPl = screen.queryByRole("link", { name: "Kontakt" });
    let aboutButtonPl = screen.queryByRole("link", { name: "O nas" });
    let projectsButtonPl = screen.queryByRole("link", { name: "Projekty" });
    let langButtonEn = screen.queryByRole("button", { name: "EN" });
    let contactButtonEn = screen.queryByRole("link", { name: "Contact" });
    let aboutButtonEn = screen.queryByRole("link", { name: "ABOUT" });
    let projectsButtonEn = screen.queryByRole("link", { name: "PROJECTS" });

    expect(loginButton).toBeInTheDocument();
    expect(contactButtonPl).toBeInTheDocument();
    expect(aboutButtonPl).toBeInTheDocument();
    expect(projectsButtonPl).toBeInTheDocument();
    expect(langButtonPl).not.toBeInTheDocument();
    expect(langButtonEn).toBeInTheDocument();
    expect(contactButtonEn).not.toBeInTheDocument();
    expect(aboutButtonEn).not.toBeInTheDocument();
    expect(projectsButtonEn).not.toBeInTheDocument();

    userEvent.click(langButtonEn);

    langButtonPl = screen.queryByRole("button", { name: "PL" });
    loginButton = screen.queryByRole("link", { name: "Login" });
    contactButtonPl = screen.queryByRole("link", { name: "Kontakt" });
    aboutButtonPl = screen.queryByRole("link", { name: "O nas" });
    projectsButtonPl = screen.queryByRole("link", { name: "Projekty" });
    langButtonEn = screen.queryByRole("button", { name: /en/i });
    contactButtonEn = screen.queryByRole("link", { name: "Contact" });
    aboutButtonEn = screen.queryByRole("link", { name: "About" });
    projectsButtonEn = screen.queryByRole("link", { name: "Projects" });

    expect(loginButton).toBeInTheDocument();
    expect(contactButtonPl).not.toBeInTheDocument();
    expect(aboutButtonPl).not.toBeInTheDocument();
    expect(projectsButtonPl).not.toBeInTheDocument();
    expect(langButtonPl).toBeInTheDocument();
    expect(langButtonEn).not.toBeInTheDocument();
    expect(contactButtonEn).toBeInTheDocument();
    expect(aboutButtonEn).toBeInTheDocument();
    expect(projectsButtonEn).toBeInTheDocument();
  });

  it(`renders modal "login" clicked`, () => {
    render(<MockApp />);

    let loginHeading = screen.queryByRole("heading", {
      name: /login/i,
    });
    let loginInput = screen.queryByPlaceholderText(/enter your login/i);
    let passwordInput = screen.queryByPlaceholderText(/enter your password/i);

    let loginButton = screen.queryByRole("link", { name: "Login" });

    userEvent.click(loginButton);

    expect(loginHeading).toBeInTheDocument();
    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
});
