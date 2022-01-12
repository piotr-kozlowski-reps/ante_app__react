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
];

const Projects = () => {
  //
  //vars
  const lang = useSelector((state) => state.language.lang);
  const [currentType, setCurrentType] = useState(type.ALL);
  //params
  const location = useLocation();
  const typeGotFromQuery =
    new URLSearchParams(location.search).get("type") || "all";

  //seting current type of prjects to be shown
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

  const projectsFiltered = DUMMY_PROJECTS.map((project) => {
    if (currentType === type.ALL) return project;
    if (
      project.type.some((type) => {
        console.log(
          `currentType: ${currentType}; type: ${type}; finalOfSome: ${
            type === currentType
          }`
        );

        return type === currentType;
      })
    ) {
      return project;
    }
  });

  console.log(projectsFiltered);

  const projectsInProperLanguage = projectsFiltered.map((project) => {
    if (lang === "pl") {
      return {
        id: project.id,
        genre: project.genre,
        projName: project.projNamePl,
        completionDate: project.completionDate,
        city: project.cityPL,
        country: project.countryPL,
        icoImg: project.icoImg,
        type: project.type,
      };
    } else {
      return {
        id: project.id,
        genre: project.genre,
        projName: project.projNameEn,
        completionDate: project.completionDate,
        city: project.cityEn,
        country: project.countryEn,
        icoImg: project.icoImg,
        type: project.type,
      };
    }
  });

  //
  //jsx
  return (
    <Fragment>
      <div data-testid="projects-page"></div>
      <Carousel />
      <ProjectsTypeNavigation />
      <ProjectsList projectsList={projectsInProperLanguage} />
      <Footer />
    </Fragment>
  );
};

export default Projects;
