import React from "react";
import { render, screen, cleanup } from "../../shared/utils/test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
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

const graphicsProject = {
  project: {
    _id: "625b2b9a8904b111bca70428",
    images: [
      {
        imageSourceFull:
          "uploads\\images\\2009_02_centrum_hotelowo_kongresowe_wroclaw_polska_001_1650142106077.jpeg",
        imageSourceThumb:
          "uploads\\images\\2009_02_centrum_hotelowo_kongresowe_wroclaw_polska_001_1650142106077__thumbnail.jpeg",
        imageAltPl: "alt+pl",
        imageAltEn: "alt+en",
        isBig: true,
        _id: "625b2b9a8904b111bca70429",
        id: "625b2b9a8904b111bca70429",
      },
      {
        imageSourceFull:
          "uploads\\images\\2009_02_centrum_hotelowo_kongresowe_wroclaw_polska_002_1650142106086.jpeg",
        imageSourceThumb:
          "uploads\\images\\2009_02_centrum_hotelowo_kongresowe_wroclaw_polska_002_1650142106086__thumbnail.jpeg",
        imageAltPl: "alt+pl",
        imageAltEn: "alt+en",
        isBig: false,
        _id: "625b2b9a8904b111bca7042a",
        id: "625b2b9a8904b111bca7042a",
      },
    ],
    genre: "GRAPHIC",
    projNamePl: "fgb",
    projNameEn: "dfgb",
    completionDate: "2010-10-10T00:00:00.000Z",
    cityPl: "dfgb",
    cityEn: "dfgb",
    clientPl: "dfgb",
    clientEn: "dfgb",
    countryPl: "dfgb",
    countryEn: "dfgb",
    icoImgFull:
      "uploads\\images\\2019_07_wnetrze_mieszkalne_essen_niemcy_ico_1650142106075.jpeg",
    icoImgThumb:
      "uploads\\images\\2019_07_wnetrze_mieszkalne_essen_niemcy_ico_1650142106075__thumbnail.jpeg",
    projectType: ["COMPETITION"],
    projectGenre: "ProjectGraphic",
    __v: 0,
    id: "625b2b9a8904b111bca70428",
  },
};

describe("ProjectShowcase", () => {
  it("shows modal when id in path is not valid", async () => {
    server.use(
      rest.get(
        `${process.env.REACT_APP_BACKEND_URL}api/projects/:projectId`,
        async (req, res, ctx) => {
          return res.once(
            ctx.status(200),
            ctx.json({
              message:
                'Something went wrong, could not find a project. (Cast to ObjectId failed for value "625b2c268904b111bca70" (type string) at path "_id" for model "Project")',
            })
          );
        }
      )
    );
    render(<MockApp />);

    const myProjectLink = await screen.findAllByTestId("project-item-link");
    userEvent.click(myProjectLink[0]);

    expect(
      await screen.findByRole("heading", {
        name: /an error occurred!/i,
      })
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/Network request failed/i)
    ).toBeInTheDocument();
  });

  it("shows graphics project", async () => {
    server.use(
      rest.get(
        `${process.env.REACT_APP_BACKEND_URL}api/projects/:projectId`,
        async (req, res, ctx) => {
          console.log(req);
          return res.once(ctx.status(200), ctx.json(graphicsProject));
        }
      )
    );

    render(<MockApp />);
    goToProjectsPage();

    // screen.getByRole("");

    const myProjectLink = await screen.findAllByTestId("project-item-link");
    userEvent.click(myProjectLink[0]);

    // await screen.findByRole("");

    // expect(
    //   await screen.findByRole("", {
    //     name: /an error occurred!/i,
    //   })
    // ).toBeInTheDocument();

    // expect(
    //   await screen.findByText(/Network request failed/i)
    // ).toBeInTheDocument();
  });
});

function changeLanguageToEn() {
  const langButton = screen.getByRole("button", {
    name: /en/i,
  });
  userEvent.click(langButton);
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

function goToProjectsPage() {
  userEvent.click(
    screen.getByRole("link", {
      name: /Projekty/i,
    })
  );
}
