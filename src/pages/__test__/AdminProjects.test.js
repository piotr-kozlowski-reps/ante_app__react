import React from "react";
import { render, screen, cleanup, within } from "../../shared/utils/test-utils";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { server, rest } from "../../../mocks/server";

import App from "../../App";

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

describe("AdminProjects", () => {
  it("shows error modal when no projects", async () => {
    server.use(
      rest.get(
        `${process.env.REACT_APP_BACKEND_URL}api/projects`,
        async (req, res, ctx) => {
          return res.once(
            ctx.status(500),
            ctx.json({ message: "Error message." })
          );
        }
      )
    );
    render(<MockApp />);
    await resetLanguageToPolish();
    await logoutIfNeeded();

    server.use(
      rest.get(
        `${process.env.REACT_APP_BACKEND_URL}api/projects`,
        async (req, res, ctx) => {
          return res.once(
            ctx.status(500),
            ctx.json({ message: "Error message." })
          );
        }
      )
    );
    await login();

    expect(await screen.findByText(/An Error Occurred!/i)).toBeInTheDocument();
    expect(await screen.findByText(/Error message./i)).toBeInTheDocument();
  });

  it("shows ProjectList heading and type links in both languages", async () => {
    render(<MockApp />);
    await resetLanguageToPolish();
    await logoutIfNeeded();
    await login();
    await goToAdminPage();
    expect(
      await screen.findByRole("heading", {
        name: /lista projektów/i,
      })
    ).toBeInTheDocument();

    //en
    await changeLanguageToEn();

    expect(screen.queryByText(/lista projektów/i)).not.toBeInTheDocument();
    expect(await screen.findByText(/PROJECTS LIST/i)).toBeInTheDocument();
  });

  it("shows CREATE NEW PROJECT button in both languages", async () => {
    render(<MockApp />);
    await resetLanguageToPolish();
    await logoutIfNeeded();
    await login();
    await goToAdminPage();

    expect(
      await screen.findByRole("button", {
        name: /utwórz nowy projekt/i,
      })
    ).toBeInTheDocument();

    //en
    await changeLanguageToEn();

    expect(
      await screen.findByRole("button", {
        name: /create new project/i,
      })
    ).toBeInTheDocument();
  });
});

////
//utils
async function login() {
  return new Promise((resolve, reject) => {
    userEvent.click(
      screen.getByRole("link", {
        name: /login/i,
      })
    );

    const loginInput = screen.queryByPlaceholderText(/enter your login/i);
    const passwordInput = screen.queryByPlaceholderText(/enter your password/i);
    userEvent.type(loginInput, "test");
    userEvent.type(passwordInput, "testTEST123##$$%");
    const loginSubmitButton = screen.getByRole("button", {
      name: /login/i,
    });
    userEvent.click(loginSubmitButton);
    resolve(true);
  });
}

async function logoutIfNeeded() {
  return new Promise((resolve, reject) => {
    if (
      screen.queryByRole("link", {
        name: /admin/i,
      })
    ) {
      const logoutButton = screen.queryByRole("link", {
        name: /logout/i,
      });
      userEvent.click(logoutButton);
    }
    resolve(true);
  });
}

async function goToAdminPage() {
  return new Promise(async (resolve, reject) => {
    const adminButton = await screen.findByRole("link", {
      name: /admin/i,
    });
    userEvent.click(adminButton);
    resolve(true);
  });
}

async function resetLanguageToPolish() {
  return new Promise(async (resolve, reject) => {
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
    resolve(true);
  });
}

async function changeLanguageToEn() {
  return new Promise((resolve, reject) => {
    const langButton = screen.getByRole("button", {
      name: "EN",
    });
    userEvent.click(langButton);
    resolve(true);
  });
}
