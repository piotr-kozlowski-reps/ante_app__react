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
    expect(await screen.findByTestId("video")).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/ljUUT4BJ_7M"
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
    expect(await screen.findByTestId("video")).toBeInTheDocument();
    expect(await screen.findByTestId("video")).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/ljUUT4BJ_7M"
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

  it("shows app project in both languages", async () => {
    render(<MockApp />);
    resetLanguageToPolish();
    goToProjectsPage();

    server.use(
      rest.get(
        `${process.env.REACT_APP_BACKEND_URL}api/projects/:projectId`,
        async (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(appProject));
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
    expect(
      await screen.findByRole("heading", {
        name: /Nazwa aplikacji \(po polsku\)/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/opis aplikacji \(po polsku\)/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/pobierz aplikację:/i)).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", {
        name: /APLIKACJA AR/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("img", { name: /nazwa aplikacji \(po polsku\)/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("img", {
        name: /android/i,
      })
    ).toBeInTheDocument();
    expect(await screen.findByTestId("app-android-link")).toBeInTheDocument();

    expect(await screen.findByTestId("app-android-link")).toHaveAttribute(
      "href",
      "Application android link"
    );

    expect(await screen.findByTestId("app-ios-link")).toHaveAttribute(
      "href",
      "Application iOS link"
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
    expect(
      await screen.findByRole("heading", {
        name: /APPLICATION NAME \(IN ENGLISH\)/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Application description \(in English\)/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Download application:/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", {
        name: /AR APP/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("img", {
        name: /Application name \(in English\)/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("img", {
        name: /android/i,
      })
    ).toBeInTheDocument();
    expect(await screen.findByTestId("app-android-link")).toBeInTheDocument();

    expect(await screen.findByTestId("app-android-link")).toHaveAttribute(
      "href",
      "Application android link"
    );

    expect(await screen.findByTestId("app-ios-link")).toHaveAttribute(
      "href",
      "Application iOS link"
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

  it("shows panorama project in both languages", async () => {
    render(<MockApp />);
    resetLanguageToPolish();
    goToProjectsPage();

    server.use(
      rest.get(
        `${process.env.REACT_APP_BACKEND_URL}api/projects/:projectId`,
        async (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(panoramaProject));
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

    expect(
      await screen.findByRole("img", { name: /nazw pano pl/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("img", { name: /nazw pano pl/i })
    ).toHaveAttribute(
      "src",
      "http://localhost:5000/uploads\\images\\2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_1650142199865.jpeg"
    );
    expect(
      await screen.findByRole("heading", { name: /nazw pano pl/i })
    ).toBeInTheDocument();
    expect(
      await (
        await screen.findAllByText(/\[kliknij by powiększyć\]/i)
      ).length
    ).toBe(2);

    expect(
      await screen.findByRole("img", { name: /nazw pano2 pl/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("img", { name: /nazw pano2 pl/i })
    ).toHaveAttribute(
      "src",
      "http://localhost:5000/uploads\\images\\2020_05_osiedle_mieszkaniowe_dormagen_niemcy_ico_1650142199905.jpeg"
    );
    expect(
      await screen.findByRole("heading", { name: /nazw pano2 pl/i })
    ).toBeInTheDocument();
    expect(
      await (
        await screen.findAllByText(/\[kliknij by powiększyć\]/i)
      ).length
    ).toBe(2);

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

    expect(
      await screen.findByRole("img", { name: /nazw pano en/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("img", { name: /nazw pano en/i })
    ).toHaveAttribute(
      "src",
      "http://localhost:5000/uploads\\images\\2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_1650142199865.jpeg"
    );
    expect(
      await screen.findByRole("heading", { name: /nazw pano en/i })
    ).toBeInTheDocument();
    expect(
      await (
        await screen.findAllByText(/\[click to enlarge\]/i)
      ).length
    ).toBe(2);

    expect(
      await screen.findByRole("img", { name: /nazw pano2 en/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("img", { name: /nazw pano2 en/i })
    ).toHaveAttribute(
      "src",
      "http://localhost:5000/uploads\\images\\2020_05_osiedle_mieszkaniowe_dormagen_niemcy_ico_1650142199905.jpeg"
    );
    expect(
      await screen.findByRole("heading", { name: /nazw pano2 en/i })
    ).toBeInTheDocument();
    expect(
      await (
        await screen.findAllByText(/\[click to enlarge\]/i)
      ).length
    ).toBe(2);

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

  it("shows panoramas modal when panorama clicked", async () => {
    render(<MockApp />);
    resetLanguageToPolish();
    goToProjectsPage();

    server.use(
      rest.get(
        `${process.env.REACT_APP_BACKEND_URL}api/projects/:projectId`,
        async (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(panoramaProject));
        }
      )
    );

    const findLinks = async () =>
      await screen.findAllByTestId("project-item-link");
    const projects = await findLinks();

    userEvent.click(projects[0]);

    const findPanoramaLinks = async () =>
      await screen.findAllByTestId("img-panorama-link");
    const panoLinks = await findPanoramaLinks();

    userEvent.click(panoLinks[0]);

    expect(await screen.findByText(/zamknij/i)).toBeInTheDocument();
    expect(screen.queryByText(/close/i)).not.toBeInTheDocument();
    expect(await screen.findByTestId("modal")).toBeInTheDocument();

    // await screen.findByRole("");

    changeLanguageToEn();
    expect(await screen.findByText(/close/i)).toBeInTheDocument();
    expect(await screen.findByTestId("modal")).toBeInTheDocument();

    //no polish in english version
    expect(screen.queryByText(/zamknij/i)).not.toBeInTheDocument();
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

const appProject = {
  project: {
    appInfo: {
      appNamePl: "Nazwa aplikacji (po polsku)",
      appNameEn: "Application name (in English)",
      appImageFull: "uploads\\images\\phone_melbeck_1650142246197.png",
      appImageThumb:
        "uploads\\images\\phone_melbeck_1650142246197__thumbnail.jpeg",
      appDescriptionPl: "Opis aplikacji (po polsku)",
      appDescriptionEn: "Application description (in English)",
      appAndroidLink: "Application android link",
      appIOSLink: "Application iOS link",
    },
    _id: "625b2c268904b111bca70440",
    genre: "APP",
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
      "uploads\\images\\2020_07_osiedle_mieszkaniowe_aachen_niemcy_ico_1650142246195.jpeg",
    icoImgThumb:
      "uploads\\images\\2020_07_osiedle_mieszkaniowe_aachen_niemcy_ico_1650142246195__thumbnail.jpeg",
    projectType: ["COMPETITION", "APP"],
    projectGenre: "ProjectApp",
    __v: 0,
    id: "625b2c268904b111bca70440",
  },
};

const panoramaProject = {
  project: {
    _id: "625b2bf88904b111bca70436",
    panoramas: [
      {
        panoramaTitlePl: "nazw pano pl",
        panoramaTitleEn: "nazw pano en",
        panoramaIcoFull:
          "uploads\\images\\2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_1650142199865.jpeg",
        panoramaIcoThumb:
          "uploads\\images\\2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_1650142199865__thumbnail.jpeg",
        panoramaImageSourceFull:
          "uploads\\images\\2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_pano02big_1650142199865.jpeg",
        panoramaImageSourceFullThumb:
          "uploads\\images\\2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_pano02big_1650142199865__thumbnail.jpeg",
        _id: "625b2bf88904b111bca70437",
        id: "625b2bf88904b111bca70437",
      },
      {
        panoramaTitlePl: "nazw pano2 pl",
        panoramaTitleEn: "nazw pano2 en",
        panoramaIcoFull:
          "uploads\\images\\2020_05_osiedle_mieszkaniowe_dormagen_niemcy_ico_1650142199905.jpeg",
        panoramaIcoThumb:
          "uploads\\images\\2020_05_osiedle_mieszkaniowe_dormagen_niemcy_ico_1650142199905__thumbnail.jpeg",
        panoramaImageSourceFull:
          "uploads\\images\\2020_05_osiedle_mieszkaniowe_dormagen_niemcy_ico_1650142199906.jpeg",
        panoramaImageSourceFullThumb:
          "uploads\\images\\2020_05_osiedle_mieszkaniowe_dormagen_niemcy_ico_1650142199906__thumbnail.jpeg",
        _id: "625b2bf88904b111bca70438",
        id: "625b2bf88904b111bca70438",
      },
    ],
    genre: "PANORAMA",
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
      "uploads\\images\\2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_1650142199863.jpeg",
    icoImgThumb:
      "uploads\\images\\2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_1650142199863__thumbnail.jpeg",
    projectType: ["COMPETITION", "ANIMATION"],
    projectGenre: "ProjectPanorama",
    __v: 0,
    id: "625b2bf88904b111bca70436",
  },
};
