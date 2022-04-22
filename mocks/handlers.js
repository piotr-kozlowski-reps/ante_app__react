import { rest } from "msw";

const mockProjects = {
  projects: [
    {
      id: "6248412a7784607e156a545ca3",
      genre: "GRAPHIC",
      projNamePl: "projNamePl",
      projNameEn: "projNameEn",
      completionDate: "2010-10-10T00:00:00.000Z",
      cityPl: "cityPl",
      cityEn: "cityEn",
      countryPl: "countryPl",
      countryEn: "countryEn",
      icoImgFull:
        "uploads\\images\\2019_07_wnetrze_mieszkalne_essen_niemcy_ico_1648902442189.jpeg",
      icoImgThumb:
        "uploads\\images\\2019_07_wnetrze_mieszkalne_essen_niemcy_ico_1648902442189__thumbnail.jpeg",
      projectType: ["COMPETITION"],
    },
    {
      id: "624aff8c4d067d468077de703",
      genre: "ANIMATION",
      projNamePl: "projNamePl",
      projNameEn: "projNameEn",
      completionDate: "2010-10-10T00:00:00.000Z",
      cityPl: "cityPl",
      cityEn: "cityEn",
      countryPl: "countryPl",
      countryEn: "countryEn",
      icoImgFull:
        "uploads\\images\\2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_1649082252102.jpeg",
      icoImgThumb:
        "uploads\\images\\2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_1649082252102__thumbnail.jpeg",
      projectType: ["COMPETITION", "INTERIOR"],
    },
    {
      id: "324aff8c4d067d4asd8077de703",
      genre: "ANIMATION",
      projNamePl: "projNamePl",
      projNameEn: "projNameEn",
      completionDate: "2010-10-10T00:00:00.000Z",
      cityPl: "cityPl",
      cityEn: "cityEn",
      countryPl: "countryPl",
      countryEn: "countryEn",
      icoImgFull:
        "uploads\\images\\2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_1649082252102.jpeg",
      icoImgThumb:
        "uploads\\images\\2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_1649082252102__thumbnail.jpeg",
      projectType: ["COMPETITION", "INTERIOR", "EXTERIOR"],
    },
    {
      id: "334aff8c4d067d480gf77de703",
      genre: "ANIMATION",
      projNamePl: "projNamePl",
      projNameEn: "projNameEn",
      completionDate: "2010-10-10T00:00:00.000Z",
      cityPl: "cityPl",
      cityEn: "cityEn",
      countryPl: "countryPl",
      countryEn: "countryEn",
      icoImgFull:
        "uploads\\images\\2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_1649082252102.jpeg",
      icoImgThumb:
        "uploads\\images\\2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_1649082252102__thumbnail.jpeg",
      projectType: ["COMPETITION", "INTERIOR", "EXTERIOR", "ANIMATION"],
    },
    {
      id: "334bff8c4d067dsd48077de703",
      genre: "ANIMATION",
      projNamePl: "projNamePl",
      projNameEn: "projNameEn",
      completionDate: "2010-10-10T00:00:00.000Z",
      cityPl: "cityPl",
      cityEn: "cityEn",
      countryPl: "countryPl",
      countryEn: "countryEn",
      icoImgFull:
        "uploads\\images\\2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_1649082252102.jpeg",
      icoImgThumb:
        "uploads\\images\\2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_1649082252102__thumbnail.jpeg",
      projectType: [
        "COMPETITION",
        "INTERIOR",
        "EXTERIOR",
        "ANIMATION",
        "PRODUCT_MODELING",
      ],
    },
    {
      id: "334bff8c4d067d480gd77de703",
      genre: "ANIMATION",
      projNamePl: "projNamePl",
      projNameEn: "projNameEn",
      completionDate: "2010-10-10T00:00:00.000Z",
      cityPl: "cityPl",
      cityEn: "cityEn",
      countryPl: "countryPl",
      countryEn: "countryEn",
      icoImgFull:
        "uploads\\images\\2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_1649082252102.jpeg",
      icoImgThumb:
        "uploads\\images\\2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_1649082252102__thumbnail.jpeg",
      projectType: [
        "COMPETITION",
        "INTERIOR",
        "EXTERIOR",
        "ANIMATION",
        "PRODUCT_MODELING",
        "PANORAMA",
      ],
    },
    {
      id: "334bff8c4d067fd48077de703",
      genre: "ANIMATION",
      projNamePl: "projNamePl",
      projNameEn: "projNameEn",
      completionDate: "2010-10-10T00:00:00.000Z",
      cityPl: "cityPl",
      cityEn: "cityEn",
      countryPl: "countryPl",
      countryEn: "countryEn",
      icoImgFull:
        "uploads\\images\\2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_1649082252102.jpeg",
      icoImgThumb:
        "uploads\\images\\2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_1649082252102__thumbnail.jpeg",
      projectType: [
        "COMPETITION",
        "INTERIOR",
        "EXTERIOR",
        "ANIMATION",
        "PRODUCT_MODELING",
        "PANORAMA",
        "APP",
      ],
    },
  ],
};

export const handlers = [
  //login
  rest.post(
    `${process.env.REACT_APP_BACKEND_URL}api/login`,
    (req, res, ctx) => {
      localStorage.setItem("userData", {
        login: "PEgaz",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IlBFZ2F6IiwiaWQiOiI2MjQ0MGMxMGJhMWM1YjAwNjhhMzlmOTgiLCJpYXQiOjE2NDkxODAzNjIsImV4cCI6MTY0OTE4Mzk2Mn0.yPDaG8nf1zOm6rhlTe8VbdSpWaDBtpABppK8I_eolc8",
        expiration: "2022-04-05T18:39:22.603Z",
      });

      return res(
        ctx.status(200),
        ctx.json({
          userId: "62440c10ba1c5b0068a39f98",
          login: "PEgaz",
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IlBFZ2F6IiwiaWQiOiI2MjQ0MGMxMGJhMWM1YjAwNjhhMzlmOTgiLCJpYXQiOjE2NDkxODAzNjIsImV4cCI6MTY0OTE4Mzk2Mn0.yPDaG8nf1zOm6rhlTe8VbdSpWaDBtpABppK8I_eolc8",
        })
      );
    }
  ),

  //contact
  rest.post(
    `${process.env.REACT_APP_BACKEND_URL}api/contact`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          lang: "pl",
          name: "Imię",
          surname: "Nazwisko",
          email: "test@test.pl",
          phone: "9649234",
          textContent: "Zapytanie jakieś tutaj",
        })
      );
    }
  ),

  //projects
  rest.get(
    `${process.env.REACT_APP_BACKEND_URL}api/projects`,
    (req, res, ctx) => {
      console.log(mockProjects);
      return res(ctx.status(200), ctx.json(mockProjects));
    }
  ),
];
