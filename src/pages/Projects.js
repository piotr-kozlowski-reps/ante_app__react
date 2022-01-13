import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import genre from "../shared/utils/genre";
import type from "../shared/utils/type";

import ProjectsList from "../components/Projects/ProjectsList";
import Carousel from "../components/Projects/Carousel";
import ProjectsTypeNavigation from "../components/Projects/ProjectsTypeNavigation";
import { useSelector } from "react-redux";

import ico1 from "../images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico.jpg";
import ico2 from "../images/2019_08_obiekt_biurowy_leverkusen_niemcy_ico.jpg";
import ico3 from "../images/2020_05_osiedle_mieszkaniowe_dormagen_niemcy_ico.jpg";
import ico4 from "../images/2020_07_osiedle_mieszkaniowe_aachen_niemcy_ico.jpg";
import Footer from "../shared/components/Footer";

const DUMMY_PROJECTS = [
  {
    id: "1",
    genre: genre.GRAPHIC,
    projNamePl: "projNamePl1",
    projNameEn: "projNameEn1",
    completionDate: new Date("2013-11"),
    cityPL: "cityPL1",
    cityEn: "cityEn1",
    countryPL: "countryPL1",
    countryEn: "countryEn1",
    icoImg: ico1,
    type: [type.COMPETITION],
  },
  {
    id: "2",
    genre: genre.GRAPHIC,
    projNamePl: "projNamePl2",
    projNameEn: "projNameEn2",
    completionDate: new Date("2018-11"),
    cityPL: "cityPL2",
    cityEn: "cityEn2",
    countryPL: "countryPL2",
    countryEn: "countryEn2",
    icoImg: ico2,
    type: [type.COMPETITION, type.INTERIOR],
  },
  {
    id: "3",
    genre: genre.GRAPHIC,
    projNamePl: "projNamePl3",
    projNameEn: "projNameEn3",
    completionDate: new Date("2020-11"),
    cityPL: "cityPL3",
    cityEn: "cityEn3",
    countryPL: "countryPL3",
    countryEn: "countryEn3",
    icoImg: ico3,
    type: [type.COMPETITION, type.INTERIOR, type.EXTERIOR],
  },
  {
    id: "4",
    genre: genre.APP,
    projNamePl: "projNamePl4",
    projNameEn: "projNameEn4",
    completionDate: new Date("2021-4"),
    cityPL: "cityPL4",
    cityEn: "cityEn4",
    countryPL: "countryPL4",
    countryEn: "countryEn4",
    icoImg: ico4,
    type: [type.COMPETITION, type.INTERIOR, type.EXTERIOR, type.ANIMATION],
  },
  {
    id: "5",
    genre: genre.APP,
    projNamePl: "projNamePl5",
    projNameEn: "projNameEn5",
    completionDate: new Date("2014-4"),
    cityPL: "cityPL5",
    cityEn: "cityEn5",
    countryPL: "countryPL5",
    countryEn: "countryEn5",
    icoImg: ico4,
    type: [
      type.COMPETITION,
      type.INTERIOR,
      type.EXTERIOR,
      type.ANIMATION,
      type.PRODUCT_MODELING,
    ],
  },
  {
    id: "6",
    genre: genre.APP,
    projNamePl: "projNamePl7",
    projNameEn: "projNameEn7",
    completionDate: new Date("2012-4"),
    cityPL: "cityPL7",
    cityEn: "cityEn7",
    countryPL: "countryPL7",
    countryEn: "countryEn7",
    icoImg: ico4,
    type: [
      type.COMPETITION,
      type.INTERIOR,
      type.EXTERIOR,
      type.ANIMATION,
      type.PRODUCT_MODELING,
      type.PANORAMA,
    ],
  },
  {
    id: "7",
    genre: genre.GRAPHIC,
    projNamePl: "projNamePl6",
    projNameEn: "projNameEn6",
    completionDate: new Date("2012-4"),
    cityPL: "cityPL6",
    cityEn: "cityEn6",
    countryPL: "countryPL6",
    countryEn: "countryEn6",
    icoImg: ico4,
    type: [
      type.COMPETITION,
      type.INTERIOR,
      type.EXTERIOR,
      type.ANIMATION,
      type.PRODUCT_MODELING,
      type.PANORAMA,
      type.APP,
    ],
  },
  {
    id: "8",
    genre: genre.GRAPHIC,
    projNamePl: "projNamePl8",
    projNameEn: "projNameEn8",
    completionDate: new Date("2013-11"),
    cityPL: "cityPL8",
    cityEn: "cityEn8",
    countryPL: "countryPL8",
    countryEn: "countryEn8",
    icoImg: ico1,
    type: [type.COMPETITION],
  },
  {
    id: "9",
    genre: genre.GRAPHIC,
    projNamePl: "projNamePl9",
    projNameEn: "projNameEn9",
    completionDate: new Date("2018-11"),
    cityPL: "cityPL9",
    cityEn: "cityEn9",
    countryPL: "countryPL9",
    countryEn: "countryEn9",
    icoImg: ico2,
    type: [type.COMPETITION, type.INTERIOR],
  },
  {
    id: "10",
    genre: genre.GRAPHIC,
    projNamePl: "projNamePl10",
    projNameEn: "projNameEn10",
    completionDate: new Date("2020-11"),
    cityPL: "cityPL10",
    cityEn: "cityEn10",
    countryPL: "countryPL10",
    countryEn: "countryEn10",
    icoImg: ico3,
    type: [type.COMPETITION, type.INTERIOR, type.EXTERIOR],
  },
  {
    id: "11",
    genre: genre.APP,
    projNamePl: "projNamePl11",
    projNameEn: "projNameEn11",
    completionDate: new Date("2021-4"),
    cityPL: "cityPL11",
    cityEn: "cityEn11",
    countryPL: "countryPL11",
    countryEn: "countryEn11",
    icoImg: ico4,
    type: [type.COMPETITION, type.INTERIOR, type.EXTERIOR, type.ANIMATION],
  },
  {
    id: "12",
    genre: genre.APP,
    projNamePl: "projNamePl12",
    projNameEn: "projNameEn12",
    completionDate: new Date("2014-4"),
    cityPL: "cityPL12",
    cityEn: "cityEn12",
    countryPL: "countryPL12",
    countryEn: "countryEn12",
    icoImg: ico4,
    type: [
      type.COMPETITION,
      type.INTERIOR,
      type.EXTERIOR,
      type.ANIMATION,
      type.PRODUCT_MODELING,
    ],
  },
  {
    id: "13",
    genre: genre.APP,
    projNamePl: "projNamePl13",
    projNameEn: "projNameEn13",
    completionDate: new Date("2012-4"),
    cityPL: "cityPL13",
    cityEn: "cityEn13",
    countryPL: "countryPL13",
    countryEn: "countryEn13",
    icoImg: ico4,
    type: [
      type.COMPETITION,
      type.INTERIOR,
      type.EXTERIOR,
      type.ANIMATION,
      type.PRODUCT_MODELING,
      type.PANORAMA,
    ],
  },
  {
    id: "14",
    genre: genre.GRAPHIC,
    projNamePl: "projNamePl14",
    projNameEn: "projNameEn14",
    completionDate: new Date("2012-4"),
    cityPL: "cityPL14",
    cityEn: "cityEn14",
    countryPL: "countryPL14",
    countryEn: "countryEn14",
    icoImg: ico4,
    type: [
      type.COMPETITION,
      type.INTERIOR,
      type.EXTERIOR,
      type.ANIMATION,
      type.PRODUCT_MODELING,
      type.PANORAMA,
      type.APP,
    ],
  },
  {
    id: "15",
    genre: genre.GRAPHIC,
    projNamePl: "projNamePl15",
    projNameEn: "projNameEn15",
    completionDate: new Date("2012-4"),
    cityPL: "cityPL15",
    cityEn: "cityEn15",
    countryPL: "countryPL15",
    countryEn: "countryEn15",
    icoImg: ico4,
    type: [
      type.COMPETITION,
      type.INTERIOR,
      type.EXTERIOR,
      type.ANIMATION,
      type.PRODUCT_MODELING,
      type.PANORAMA,
      type.APP,
    ],
  },
  {
    id: "16",
    genre: genre.GRAPHIC,
    projNamePl: "projNamePl16",
    projNameEn: "projNameEn16",
    completionDate: new Date("2013-11"),
    cityPL: "cityPL16",
    cityEn: "cityEn16",
    countryPL: "countryPL16",
    countryEn: "countryEn16",
    icoImg: ico1,
    type: [type.COMPETITION],
  },
  {
    id: "17",
    genre: genre.GRAPHIC,
    projNamePl: "projNamePl17",
    projNameEn: "projNameEn17",
    completionDate: new Date("2018-11"),
    cityPL: "cityPL17",
    cityEn: "cityEn17",
    countryPL: "countryPL17",
    countryEn: "countryEn17",
    icoImg: ico2,
    type: [type.COMPETITION, type.INTERIOR],
  },
  {
    id: "18",
    genre: genre.GRAPHIC,
    projNamePl: "projNamePl18",
    projNameEn: "projNameEn18",
    completionDate: new Date("2020-11"),
    cityPL: "cityPL18",
    cityEn: "cityEn18",
    countryPL: "countryPL18",
    countryEn: "countryEn18",
    icoImg: ico3,
    type: [type.COMPETITION, type.INTERIOR, type.EXTERIOR],
  },
  {
    id: "19",
    genre: genre.APP,
    projNamePl: "projNamePl19",
    projNameEn: "projNameEn19",
    completionDate: new Date("2021-4"),
    cityPL: "cityPL19",
    cityEn: "cityEn19",
    countryPL: "countryPL19",
    countryEn: "countryEn19",
    icoImg: ico4,
    type: [type.COMPETITION, type.INTERIOR, type.EXTERIOR, type.ANIMATION],
  },
  {
    id: "20",
    genre: genre.APP,
    projNamePl: "projNamePl20",
    projNameEn: "projNameEn20",
    completionDate: new Date("2014-4"),
    cityPL: "cityPL20",
    cityEn: "cityEn20",
    countryPL: "countryPL20",
    countryEn: "countryEn20",
    icoImg: ico4,
    type: [
      type.COMPETITION,
      type.INTERIOR,
      type.EXTERIOR,
      type.ANIMATION,
      type.PRODUCT_MODELING,
    ],
  },
  {
    id: "21",
    genre: genre.APP,
    projNamePl: "projNamePl21",
    projNameEn: "projNameEn21",
    completionDate: new Date("2012-4"),
    cityPL: "cityPL21",
    cityEn: "cityEn21",
    countryPL: "countryPL21",
    countryEn: "countryEn21",
    icoImg: ico4,
    type: [
      type.COMPETITION,
      type.INTERIOR,
      type.EXTERIOR,
      type.ANIMATION,
      type.PRODUCT_MODELING,
      type.PANORAMA,
    ],
  },
  {
    id: "22",
    genre: genre.GRAPHIC,
    projNamePl: "projNamePl22",
    projNameEn: "projNameEn22",
    completionDate: new Date("2012-4"),
    cityPL: "cityPL22",
    cityEn: "cityEn22",
    countryPL: "countryPL22",
    countryEn: "countryEn22",
    icoImg: ico4,
    type: [
      type.COMPETITION,
      type.INTERIOR,
      type.EXTERIOR,
      type.ANIMATION,
      type.PRODUCT_MODELING,
      type.PANORAMA,
      type.APP,
    ],
  },
];

const Projects = () => {
  //
  //vars
  const lang = useSelector((state) => state.language.lang);
  const [currentType, setCurrentType] = useState(type.ALL);
  const [currentProjectsArray, setCurrentProjectsArray] = useState([]);
  const [paginationNumber, setPaginationNumber] = useState(8);
  //params
  const location = useLocation();
  const typeGotFromQuery =
    new URLSearchParams(location.search).get("type") || "all";

  //setting current type of projects to be shown
  useEffect(() => {
    switch (typeGotFromQuery) {
      case "competitions":
        setCurrentType(type.COMPETITION);
        break;
      case "interiors":
        setCurrentType(type.INTERIOR);
        break;
      case "exteriors":
        setCurrentType(type.EXTERIOR);
        break;
      case "animations":
        setCurrentType(type.ANIMATION);
        break;
      case "3dmodeling":
        setCurrentType(type.PRODUCT_MODELING);
        break;
      case "panoramas":
        setCurrentType(type.PANORAMA);
        break;
      case "apps":
        setCurrentType(type.APP);
        break;
      default:
        setCurrentType(type.ALL);
    }
  }, [typeGotFromQuery]);

  //setting array of projects with desired type and language
  const projectsFiltered = DUMMY_PROJECTS.filter((project) => {
    if (currentType === type.ALL) return true;
    if (project.type.some((type) => type === currentType)) return true;
  })
    .sort((a, b) => b.completionDate - a.completionDate)
    .map((project) => {
      if (lang === "pl") {
        return {
          id: project.id,
          projName: project.projNamePl,
          completionDate: project.completionDate,
          city: project.cityPL,
          country: project.countryPL,
          icoImg: project.icoImg,
        };
      } else {
        return {
          id: project.id,
          projName: project.projNameEn,
          completionDate: project.completionDate,
          city: project.cityEn,
          country: project.countryEn,
          icoImg: project.icoImg,
        };
      }
    });

  const projectsPaginated = projectsFiltered.splice(0, paginationNumber);

  //
  //jsx
  return (
    <Fragment>
      <div data-testid="projects-page"></div>
      <Carousel />
      <ProjectsTypeNavigation />
      <ProjectsList projectsList={projectsPaginated} lang={lang} />
      <Footer />
    </Fragment>
  );
};

export default Projects;
