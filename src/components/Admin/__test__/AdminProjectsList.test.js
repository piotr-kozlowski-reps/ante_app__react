import React from "react";
import {
  render,
  screen,
  cleanup,
  within,
} from "../../../shared/utils/test-utils";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
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

describe("Admin Projects List", () => {
  it("renders 'kind of list' information in proper language", async () => {
    render(<MockApp />);
    await resetLanguageToPolish();
    await logoutIfNeeded();
    await loginIfNeeded();
    await goToAdminPage();

    //all
    expect(
      await screen.findByText(/lista projektów: wszystkie/i)
    ).toBeInTheDocument();

    //competitions
    userEvent.click(
      await screen.findByRole("link", {
        name: /konkursy/i,
      })
    );
    expect(
      await screen.findByText(/lista projektów: konkursy/i)
    ).toBeInTheDocument();

    //interiors
    userEvent.click(
      await screen.findByRole("link", {
        name: /^wnętrza/i,
      })
    );
    expect(
      await screen.findByText(/lista projektów: wnętrza/i)
    ).toBeInTheDocument();

    //exteriors
    userEvent.click(
      await screen.findByRole("link", {
        name: /zewnętrza/i,
      })
    );
    expect(
      await screen.findByText(/lista projektów: zewnętrza/i)
    ).toBeInTheDocument();

    //animations
    userEvent.click(
      await screen.findByRole("link", {
        name: /animacje/i,
      })
    );
    expect(
      await screen.findByText(/lista projektów: animacje/i)
    ).toBeInTheDocument();

    //products modeling
    userEvent.click(
      await screen.findByRole("link", {
        name: /modelowanie produktów/i,
      })
    );
    expect(
      await screen.findByText(/lista projektów: modelowanie produktów/i)
    ).toBeInTheDocument();

    //panoramas
    userEvent.click(
      await screen.findByRole("link", {
        name: /panoramy 360°/i,
      })
    );
    expect(
      await screen.findByText(/lista projektów: panoramy 360/i)
    ).toBeInTheDocument();

    //ar apps
    userEvent.click(
      await screen.findByRole("link", {
        name: /ar apps/i,
      })
    );
    expect(
      await screen.findByText(/lista projektów: ar apps/i)
    ).toBeInTheDocument();

    ////en
    changeLanguageToEn();

    //all
    userEvent.click(
      await screen.findByRole("link", {
        name: /all/i,
      })
    );
    expect(
      await screen.findByText(/list of projects: all/i)
    ).toBeInTheDocument();

    //competitions
    userEvent.click(
      await screen.findByRole("link", {
        name: /competitions/i,
      })
    );
    expect(
      await screen.findByText(/list of projects: competitions/i)
    ).toBeInTheDocument();

    //interiors
    userEvent.click(
      await screen.findByRole("link", {
        name: /interiors/i,
      })
    );
    expect(
      await screen.findByText(/list of projects: interiors/i)
    ).toBeInTheDocument();

    //exteriors
    userEvent.click(
      await screen.findByRole("link", {
        name: /exteriors/i,
      })
    );
    expect(
      await screen.findByText(/list of projects: exteriors/i)
    ).toBeInTheDocument();

    //animations
    userEvent.click(
      await screen.findByRole("link", {
        name: /animations/i,
      })
    );
    expect(
      await screen.findByText(/list of projects: animations/i)
    ).toBeInTheDocument();

    //products modeling
    userEvent.click(
      await screen.findByRole("link", {
        name: /products modeling/i,
      })
    );
    expect(
      await screen.findByText(/list of projects: 3dmodeling/i)
    ).toBeInTheDocument();

    //panoramas
    userEvent.click(
      await screen.findByRole("link", {
        name: /360° panoramas/i,
      })
    );
    expect(
      await screen.findByText(/list of projects: panoramas/i)
    ).toBeInTheDocument();

    //ar apps
    userEvent.click(
      await screen.findByRole("link", {
        name: /ar apps/i,
      })
    );
    expect(
      await screen.findByText(/list of projects: apps/i)
    ).toBeInTheDocument();
  });
});

////
//utils
async function loginIfNeeded() {
  return new Promise(async (resolve, reject) => {
    const loginButton = screen.queryByRole("link", {
      name: /login/i,
    }); //?
    let logoutButton = screen.queryByText(/logout/i); //?

    if (logoutButton) resolve(true);

    if (loginButton) {
      userEvent.click(
        screen.getByRole("link", {
          name: /login/i,
        })
      );

      const loginInput = screen.queryByPlaceholderText(/enter your login/i);
      const passwordInput =
        screen.queryByPlaceholderText(/enter your password/i);
      userEvent.type(loginInput, "test");
      userEvent.type(passwordInput, "testTEST123##$$%");
      const loginSubmitButton = screen.getByRole("button", {
        name: /login/i,
      });
      userEvent.click(loginSubmitButton);

      logoutButton = await screen.findByText(/logout/i);

      if (logoutButton) resolve(true);
      else reject(false);
    }
  });
}

async function logoutIfNeeded() {
  return new Promise((resolve, reject) => {
    if (
      screen.queryByRole("link", {
        name: /admin/i,
      })
    ) {
      const logoutButton = screen.queryByRole("button", {
        name: /logout/i,
      });
      if (logoutButton) userEvent.click(logoutButton);
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

    const listaProjectowText = await screen.findByRole("heading", {
      name: /LISTA PROJEKTÓW/i,
    });
    if (listaProjectowText) resolve(true);
    else reject(false);
  });
}

async function resetLanguageToPolish() {
  return new Promise((resolve, reject) => {
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

    if (
      screen.queryByRole("button", {
        name: "EN",
      })
    ) {
      resolve(true);
    } else reject(false);
  });
}

function changeLanguageToEn() {
  const langButton = screen.getByRole("button", {
    name: "EN",
  });
  userEvent.click(langButton);
}
