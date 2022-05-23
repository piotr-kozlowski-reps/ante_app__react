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

describe("NewProject", () => {
  it("shows CREATE_NEW_PROJECT / stages of a form / buttons.", async () => {
    render(<MockApp />);

    await resetLanguageToPolish();
    await logoutIfNeeded();
    await loginIfNeeded();
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

  it("goes though happy path of graphics_form", async () => {
    render(<MockApp />);
    await resetLanguageToPolish();
    await logoutIfNeeded();
    await loginIfNeeded();
    await goToAdminPage();
    await goToCreateNewProject();

    const graphicsButton = await screen.findByRole("button", {
      name: /graphic/i,
    });
    userEvent.click(graphicsButton);
    expect(
      await screen.findByRole("textbox", {
        name: /nazwa projektu \(po polsku\)\./i,
      })
    ).toBeInTheDocument();

    //TODO: further test of happy path with Graphic form

    // await screen.findByRole("");
  });

  it("tests if JSON.stringify makes its work", () => {
    const dataToBeSent = {
      genre: "GRAPHIC",
      projNamePl: "fgb",
      projNameEn: "dfgb",
      cityPl: "dfgb",
      cityEn: "dfgb",
      countryPl: "dfgb",
      countryEn: "dfgb",
      clientPl: "dfgb",
      clientEn: "dfgb",
      completionDate: "2010-10-10T00:00:00.000Z",
      projectType: ["COMPETITION"],
      icoImgFull:
        "https://res.cloudinary.com/dn8l30dkf/image/upload/v1652644149/ante_portfolio_images/2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_rxgbf7.jpg",
      images: [
        {
          imageAltPl: "vf",
          imageAltEn: "fvds",
          isBig: true,
          imageSourceFull:
            "https://res.cloudinary.com/dn8l30dkf/image/upload/v1652644149/ante_portfolio_images/2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01__thumb_vuijwg.jpg",
          imageSourceThumb:
            "https://res.cloudinary.com/dn8l30dkf/image/upload/c_scale,h_80,q_39,w_100/v1652644149/ante_portfolio_images/2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01__thumb_vuijwg.jpg",
        },
      ],
      icoImgThumb:
        "https://res.cloudinary.com/dn8l30dkf/image/upload/c_scale,h_80,q_39,w_100/v1652644149/ante_portfolio_images/2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_rxgbf7.jpg",
    };

    console.log(JSON.stringify(dataToBeSent)); //?
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

async function goToCreateNewProject() {
  return new Promise(async (resolve, reject) => {
    const createNewProjectButton = await screen.findByRole("button", {
      name: /UTWÓRZ NOWY PROJEKT/i,
    });
    userEvent.click(createNewProjectButton);

    const chooseNewProjectGenreText = await screen.findByTestId(
      "choose-project-genre"
    );
    if (chooseNewProjectGenreText) resolve(true);
    else resolve(false);
  });
}

async function goToGraphicsForm() {
  const graphicButton = await screen.findByRole("button", {
    name: /graphic/i,
  });
  userEvent.click(graphicButton);
}
