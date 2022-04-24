import React from "react";
import { render, screen, cleanup, within } from "../../shared/utils/test-utils";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { server, rest } from "../../../mocks/server";

import App from "../../App";
import { func } from "prop-types";

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

describe("NewProject", () => {
  it("shows CREATE_NEW_PROJECT / stages of a form / buttons.", async () => {
    render(<MockApp />);
    resetLanguageToPolish();
    logoutIfNeeded();
    await login();
    await goToAdminPage();
    await goToCreateNewProject();

    expect(
      await screen.findByTestId("choose-project-genre")
    ).toBeInTheDocument();

    expect(await screen.findByTestId("common-data")).toBeInTheDocument();
    expect(
      await screen.findByTestId("project-attachments")
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("button", { name: /graphic/i })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("button", { name: /ANIMATION/i })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("button", { name: /PANORAMA/i })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("button", {
        name: /APP/i,
      })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("button", {
        name: /CANCEL/i,
      })
    ).toBeInTheDocument();
  });

  it("goes though happy path of graphics_form ", async () => {
    render(<MockApp />);
    resetLanguageToPolish();
    logoutIfNeeded();
    await login();
    await goToAdminPage();
    // await goToCreateNewProject();

    userEvent.click(await screen.findByRole("button", { name: /GRAPHIC/i }));

    // await screen.findByRole("input");
  });
});

////
//utils
async function login() {
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
}

async function logoutIfNeeded() {
  if (
    screen.queryByRole("link", {
      name: /admin/i,
    })
  ) {
    const logoutButton = screen.queryByRole("button", {
      name: /logout/i,
    });
    userEvent.click(logoutButton);
  }
}

async function goToAdminPage() {
  const adminButton = await screen.findByRole("link", {
    name: /admin/i,
  });
  userEvent.click(adminButton);
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

function changeLanguageToEn() {
  const langButton = screen.getByRole("button", {
    name: "EN",
  });
  userEvent.click(langButton);
}

async function goToCreateNewProject() {
  const createNewProjectButton = await screen.findByRole("button", {
    name: /UTWÓRZ NOWY PROJEKT/i,
  });
  userEvent.click(createNewProjectButton);
}

async function goToGraphicsForm() {
  const graphicButton = await screen.findByRole("button", {
    name: /graphic/i,
  });
  userEvent.click(graphicButton);
}
