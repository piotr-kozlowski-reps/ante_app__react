import React from "react";
import {
  render,
  screen,
  cleanup,
  within,
} from "../../../shared/utils/test-utils";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

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

describe("AdminProjectItem", () => {
  it("renders all desired data", async () => {
    render(<MockApp />);
    resetLanguageToPolish();
    logoutIfNeeded();
    await login();
    await goToAdminPage();

    expect(
      await (
        await screen.findAllByTestId("project-item-admin")
      ).length
    ).toBe(7);

    expect(
      await screen.findByRole("img", { name: /projNamePl_doTestów/i })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("img", { name: /projNamePl_doTestów/i })
    ).toHaveAttribute(
      "src",
      "http://localhost:5000/uploads\\images\\2019_07_wnetrze_mieszkalne_essen_niemcy_ico_1648902442189__thumbnail.jpeg"
    );

    expect(
      await screen.findByRole("heading", {
        name: /projNamePl_doTestów\/projNameEn_forTests/i,
      })
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/id: 6248412a7784607e156a545ca3/i)
    ).toBeInTheDocument();

    expect(await screen.findByText(/2020-12/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/cityPl_doTestów\/cityEn_forTests/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/countryPl_doTestów\/countryEn_forTests/i)
    ).toBeInTheDocument();

    expect(
      await (
        await screen.findAllByRole("button", {
          name: /ZMIEŃ/i,
        })
      ).length
    ).toBe(7);

    expect(
      await (
        await screen.findAllByRole("button", {
          name: /KASUJ/i,
        })
      ).length
    ).toBe(7);

    //en
    changeLanguageToEn();

    expect(
      await (
        await screen.findAllByRole("button", {
          name: /EDIT/i,
        })
      ).length
    ).toBe(7);

    expect(
      await (
        await screen.findAllByRole("button", {
          name: /DELETE/i,
        })
      ).length
    ).toBe(7);

    expect(
      await (
        await screen.queryAllByRole("button", {
          name: /ZMIEŃ/i,
        })
      ).length
    ).toBe(0);

    expect(
      await (
        await screen.queryAllByRole("button", {
          name: /KASUJ/i,
        })
      ).length
    ).toBe(0);
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
