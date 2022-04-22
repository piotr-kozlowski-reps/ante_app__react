// import React from "react";
import { render, screen, cleanup } from "../../shared/utils/test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
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

describe("ProjectShowcase", () => {
  it("shows modal when id in path is not valid", async () => {
    server.use(
      rest.get(
        `${process.env.REACT_APP_BACKEND_URL}api/projects/:projectId`,
        async (req, res, ctx) => {
          return res.once(
            ctx.status(500),
            ctx.json({
              message:
                'Something went wrong, could not find a project. (Cast to ObjectId failed for value "625b2c268904b111bca70" (type string) at path "_id" for model "Project")',
            })
          );
        }
      )
    );
    render(<MockApp />);

    const findLinks = async () =>
      await screen.findAllByTestId("project-item-link");
    const projects = await findLinks();

    userEvent.click(projects[0]);

    expect(
      await screen.findByRole("heading", {
        name: /an error occurred!/i,
      })
    ).toBeInTheDocument();

    expect(
      await screen.findByText(
        /something went wrong, could not find a project\. \(cast to objectid failed for value "625b2c268904b111bca70" \(type string\) at path "_id" for model "project"\)/i
      )
    ).toBeInTheDocument();
  });

  it("shows graphics project in both languages", async () => {
    render(<MockApp />);
    goToProjectsPage();

    server.use(
      rest.get(
        `${process.env.REACT_APP_BACKEND_URL}api/projects/:projectId`,
        async (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(graphicsProject));
        }
      )
    );

    const findLinks = async () =>
      await screen.findAllByTestId("project-item-link");
    const projects = await findLinks();

    userEvent.click(projects[0]);

    expect(await screen.findByText("co/")).toBeInTheDocument();
    expect(await screen.findByText("projNamePl")).toBeInTheDocument();
    expect(await screen.findByText("kiedy/gdzie/")).toBeInTheDocument();
    expect(
      await screen.findByText("2010 / cityPl [countryPl]")
    ).toBeInTheDocument();
    expect(await screen.findByText("dla/")).toBeInTheDocument();
    expect(await screen.findByText("clientPl")).toBeInTheDocument();
    expect(await findImageOnePl()).toBeInTheDocument();
    expect(await findImageOnePl()).toHaveClass("big-img");
    expect(await findImageOnePl()).toHaveAttribute(
      "src",
      "http://localhost:5000/uploads\\images\\2009_02_centrum_hotelowo_kongresowe_wroclaw_polska_001_1648902442191.jpeg"
    );
    expect(await findImageTwoPl()).toBeInTheDocument();
    expect(await findImageTwoPl()).not.toHaveClass("big-img");
    expect(await findImageTwoPl()).toHaveAttribute(
      "src",
      "http://localhost:5000/uploads\\images\\2009_02_centrum_hotelowo_kongresowe_wroclaw_polska_001_1648902442191drugi.jpeg"
    );

    //en
    changeLanguageToEn();
    expect(await screen.findByText("what/")).toBeInTheDocument();
    expect(await screen.findByText("projNameEn")).toBeInTheDocument();
    expect(await screen.findByText("when/where/")).toBeInTheDocument();
    expect(
      await screen.findByText("2010 / cityEn [countryEn]")
    ).toBeInTheDocument();
    expect(await screen.findByText("for/")).toBeInTheDocument();
    expect(await screen.findByText("clientEn")).toBeInTheDocument();
    expect(await findImageOneEn()).toBeInTheDocument();
    expect(await findImageOneEn()).toHaveClass("big-img");
    expect(await findImageOneEn()).toHaveAttribute(
      "src",
      "http://localhost:5000/uploads\\images\\2009_02_centrum_hotelowo_kongresowe_wroclaw_polska_001_1648902442191.jpeg"
    );
    expect(await findImageTwoEn()).toBeInTheDocument();
    expect(await findImageTwoEn()).not.toHaveClass("big-img");
    expect(await findImageTwoEn()).toHaveAttribute(
      "src",
      "http://localhost:5000/uploads\\images\\2009_02_centrum_hotelowo_kongresowe_wroclaw_polska_001_1648902442191drugi.jpeg"
    );

    //no polish in english version
    expect(screen.queryByText("co/")).not.toBeInTheDocument();
    expect(screen.queryByText("projNamePl")).not.toBeInTheDocument();
    expect(screen.queryByText("kiedy/gdzie/")).not.toBeInTheDocument();
    expect(
      screen.queryByText("2010 / cityPl [countryPl]")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("dla/")).not.toBeInTheDocument();
    expect(screen.queryByText("clientPl")).not.toBeInTheDocument();
  });

  it("shows animation project in both languages", async () => {
    render(<MockApp />);
    resetLanguageToPolish();
    goToProjectsPage();

    server.use(
      rest.get(
        `${process.env.REACT_APP_BACKEND_URL}api/projects/:projectId`,
        async (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(animationProject));
        }
      )
    );

    const findLinks = async () =>
      await screen.findAllByTestId("project-item-link");
    const projects = await findLinks();

    userEvent.click(projects[0]);

    expect(await screen.findByText("co/")).toBeInTheDocument();
    expect(await screen.findByText("projNamePl")).toBeInTheDocument();
    expect(await screen.findByText("kiedy/gdzie/")).toBeInTheDocument();
    expect(
      await screen.findByText("2010 / cityPl [countryPl]")
    ).toBeInTheDocument();
    expect(await screen.findByText("dla/")).toBeInTheDocument();
    expect(await screen.findByText("clientPl")).toBeInTheDocument();
    expect(await screen.findByTestId("video")).toBeInTheDocument();
    expect(await screen.findByTestId("video")).toHaveAttribute("");

    // await screen.findByRole("");
    // expect(await findImageOnePl()).toBeInTheDocument();
    // expect(await findImageOnePl()).toHaveClass("big-img");
    // expect(await findImageOnePl()).toHaveAttribute(
    //   "src",
    //   "http://localhost:5000/uploads\\images\\2009_02_centrum_hotelowo_kongresowe_wroclaw_polska_001_1648902442191.jpeg"
    // );
    // expect(await findImageTwoPl()).toBeInTheDocument();
    // expect(await findImageTwoPl()).not.toHaveClass("big-img");
    // expect(await findImageTwoPl()).toHaveAttribute(
    //   "src",
    //   "http://localhost:5000/uploads\\images\\2009_02_centrum_hotelowo_kongresowe_wroclaw_polska_001_1648902442191drugi.jpeg"
    // );

    // //en
    // changeLanguageToEn();
    // expect(await screen.findByText("what/")).toBeInTheDocument();
    // expect(await screen.findByText("projNameEn")).toBeInTheDocument();
    // expect(await screen.findByText("when/where/")).toBeInTheDocument();
    // expect(
    //   await screen.findByText("2010 / cityEn [countryEn]")
    // ).toBeInTheDocument();
    // expect(await screen.findByText("for/")).toBeInTheDocument();
    // expect(await screen.findByText("clientEn")).toBeInTheDocument();
    // expect(await findImageOneEn()).toBeInTheDocument();
    // expect(await findImageOneEn()).toHaveClass("big-img");
    // expect(await findImageOneEn()).toHaveAttribute(
    //   "src",
    //   "http://localhost:5000/uploads\\images\\2009_02_centrum_hotelowo_kongresowe_wroclaw_polska_001_1648902442191.jpeg"
    // );
    // expect(await findImageTwoEn()).toBeInTheDocument();
    // expect(await findImageTwoEn()).not.toHaveClass("big-img");
    // expect(await findImageTwoEn()).toHaveAttribute(
    //   "src",
    //   "http://localhost:5000/uploads\\images\\2009_02_centrum_hotelowo_kongresowe_wroclaw_polska_001_1648902442191drugi.jpeg"
    // );

    // //no polish in english version
    // expect(screen.queryByText("co/")).not.toBeInTheDocument();
    // expect(screen.queryByText("projNamePl")).not.toBeInTheDocument();
    // expect(screen.queryByText("kiedy/gdzie/")).not.toBeInTheDocument();
    // expect(
    //   screen.queryByText("2010 / cityPl [countryPl]")
    // ).not.toBeInTheDocument();
    // expect(screen.queryByText("dla/")).not.toBeInTheDocument();
    // expect(screen.queryByText("clientPl")).not.toBeInTheDocument();
  });
});

////
//utils
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

async function findImageOnePl() {
  return await screen.findByRole("img", {
    name: /10\.2010r\. projNamePl, cityPl\. kraj: countryPl\. asdcwf/i,
  });
}

async function findImageOneEn() {
  return await screen.findByRole("img", {
    name: /October, 2010. projNameEn, cityEn. Country: countryEn. asdcasdeg/i,
  });
}

async function findImageTwoPl() {
  return await screen.findByRole("img", {
    name: /10.2010r. projNamePl, cityPl. Kraj: countryPl. alt pl/i,
  });
}

async function findImageTwoEn() {
  return await screen.findByRole("img", {
    name: /October, 2010. projNameEn, cityEn. Country: countryEn. alt en/i,
  });
}

const graphicsProject = {
  project: {
    _id: "6248412a7784607e1a545ca3",
    images: [
      {
        imageSourceFull:
          "uploads\\images\\2009_02_centrum_hotelowo_kongresowe_wroclaw_polska_001_1648902442191.jpeg",
        imageSourceThumb:
          "uploads\\images\\2009_02_centrum_hotelowo_kongresowe_wroclaw_polska_001_1648902442191__thumbnail.jpeg",
        imageAltPl: "asdcwf",
        imageAltEn: "asdcasdeg",
        isBig: true,
        _id: "624b01124d067d48077de717",
        id: "624b01124d067d48077de717",
      },
      {
        imageSourceFull:
          "uploads\\images\\2009_02_centrum_hotelowo_kongresowe_wroclaw_polska_001_1648902442191drugi.jpeg",
        imageSourceThumb:
          "uploads\\images\\2009_02_centrum_hotelowo_kongresowe_wroclaw_polska_001_1648902442191drugi__thumbnail.jpeg",
        imageAltPl: "alt pl",
        imageAltEn: "alt en",
        isBig: false,
        _id: "624b01124d067d48077de714",
        id: "624b01124d067d48077de714",
      },
    ],
    genre: "GRAPHIC",
    projNamePl: "projNamePl",
    projNameEn: "projNameEn",
    completionDate: "2010-10-10T00:00:00.000Z",
    cityPl: "cityPl",
    cityEn: "cityEn",
    clientPl: "clientPl",
    clientEn: "clientEn",
    countryPl: "countryPl",
    countryEn: "countryEn",
    icoImgFull:
      "uploads\\images\\2019_07_wnetrze_mieszkalne_essen_niemcy_ico_1648902442189.jpeg",
    icoImgThumb:
      "uploads\\images\\2019_07_wnetrze_mieszkalne_essen_niemcy_ico_1648902442189__thumbnail.jpeg",
    projectType: ["COMPETITION"],
    projectGenre: "ProjectGraphic",
    __v: 1,
    id: "6248412a7784607e1a545ca3",
  },
};

const animationProject = {
  project: {
    _id: "624aff8c4d067d48077de703",
    videoSource: "https://www.youtube.com/embed/ljUUT4BJ_7M",
    videoSourceThumb:
      "uploads\\images\\2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01__thumb_1649082252105.jpeg",
    genre: "ANIMATION",
    projNamePl: "projNamePl",
    projNameEn: "projNameEn",
    completionDate: "2010-10-10T00:00:00.000Z",
    cityPl: "cityPl",
    cityEn: "cityEn",
    clientPl: "clientPl",
    clientEn: "clientEn",
    countryPl: "countryPl",
    countryEn: "countryEn",
    icoImgFull:
      "uploads\\images\\2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_1649082252102_anim.jpeg",
    icoImgThumb:
      "uploads\\images\\2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_1649082252102_anim__thumbnail.jpeg",
    projectType: ["COMPETITION"],
    projectGenre: "ProjectAnimation",
    __v: 0,
    id: "624aff8c4d067d48077de703",
  },
};
