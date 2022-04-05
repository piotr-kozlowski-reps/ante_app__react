import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, cleanup } from "../../utils/test-utils";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";
import { server, rest } from "../../../../mocks/server";

//mock localStorage

import App from "../../../App";

const MockApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

describe("MainNavigation", () => {
  //setup
  afterEach(() => {
    cleanup();
  });

  //tests
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
    let loginInput = screen.queryByLabelText("Login");
    let passwordInput = screen.queryByPlaceholderText(/enter your password/i);
    let loginButton = screen.queryByRole("link", { name: "Login" });

    expect(loginHeading).not.toBeInTheDocument();
    expect(loginInput).not.toBeInTheDocument();
    expect(passwordInput).not.toBeInTheDocument();

    userEvent.click(loginButton);

    loginHeading = screen.queryByRole("heading", {
      name: /login/i,
    });
    loginInput = screen.queryByPlaceholderText(/enter your login/i);
    passwordInput = screen.queryByPlaceholderText(/enter your password/i);

    // screen.getByRole("");

    expect(loginHeading).toBeInTheDocument();
    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("should become logged and show appropriate link when logged through the form.", async () => {
    render(<MockApp />);

    const loginButton = screen.queryByRole("link", { name: "Login" });
    userEvent.click(loginButton);

    const loginInput = screen.queryByPlaceholderText(/enter your login/i);
    const passwordInput = screen.queryByPlaceholderText(/enter your password/i);
    userEvent.type(loginInput, "test");
    userEvent.type(passwordInput, "testTEST123##$$%");

    const loginSubmitButton = screen.getByRole("button", {
      name: /login/i,
    });
    userEvent.click(loginSubmitButton);

    expect(
      await screen.findByRole("link", {
        name: /logout/i,
      })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("link", {
        name: /admin/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("link", {
        name: /login/i,
      })
    ).not.toBeInTheDocument();

    expect(localStorage.getItem("userData")).toBeDefined();

    localStorage.setItem("userData", null);
  });

  it("should stay unlogged when logging through the form with wrong credentials.", async () => {
    render(<MockApp />);

    const testErrorMessage = `Wrong login, there's no user with login provided.`;
    server.use(
      rest.post(
        `${process.env.REACT_APP_BACKEND_URL}api/login`,
        async (req, res, ctx) => {
          return res(ctx.status(403), ctx.json({ message: testErrorMessage }));
        }
      )
    );

    const loginButton = screen.queryByRole("link", { name: "Login" }); //?
    userEvent.click(loginButton);

    const loginInput = screen.queryByPlaceholderText(/enter your login/i);
    const passwordInput = screen.queryByPlaceholderText(/enter your password/i);
    userEvent.type(loginInput, "test");
    userEvent.type(passwordInput, "testTEST123##$$%");

    const loginSubmitButton = screen.getByRole("button", {
      name: /login/i,
    });
    userEvent.click(loginSubmitButton);

    expect(
      await screen.findByRole("link", {
        name: "Login",
      })
    ).toBeInTheDocument();

    expect(
      await screen.queryByRole("link", {
        name: /admin/i,
      })
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /an error occurred!/i,
      })
    ).toBeInTheDocument();
  });

  it("should render PortfolioPage when Projekty_Link clicked", () => {
    render(<MockApp />);

    let projectsButtonPl = screen.queryByRole("link", { name: "Projekty" });
    userEvent.click(projectsButtonPl);

    expect(
      screen.getByRole("heading", {
        name: /portfolio/i,
      })
    ).toBeInTheDocument();
  });

  it("should render OnasPage when Onas_Link clicked", () => {
    render(<MockApp />);

    let aboutButtonPl = screen.queryByRole("link", { name: "O nas" });
    userEvent.click(aboutButtonPl);

    expect(screen.getByTestId("about-page")).toBeInTheDocument();
  });

  it("should renderKontaktPage when Kontakt_Link clicked", () => {
    render(<MockApp />);

    let kontaktButtonPl = screen.queryByRole("link", { name: /kontakt/i });
    userEvent.click(kontaktButtonPl);

    expect(screen.getByTestId("contact-page")).toBeInTheDocument();
  });

  it("should show proper links when loggedOut", () => {
    render(<MockApp />);

    const loginButton = screen.queryByRole("link", { name: "Login" });
    userEvent.click(loginButton);

    const loginInput = screen.queryByPlaceholderText(/enter your login/i);
    const passwordInput = screen.queryByPlaceholderText(/enter your password/i);
    userEvent.type(loginInput, "test");
    userEvent.type(passwordInput, "testTEST123##$$%");

    const loginSubmitButton = screen.getByRole("button", {
      name: /login/i,
    });
    userEvent.click(loginSubmitButton);

    //TODO: I have no idea how to get logout button since it's not in DOM

    // const logoutLink = screen.getByRole("link", {
    //   name: /logout/i,
    // });

    // userEvent.click(logoutLink);

    // expect(
    //   screen.queryByRole("link", {
    //     name: /logout/i,
    //   })
    // ).not.toBeInTheDocument();
  });
});
