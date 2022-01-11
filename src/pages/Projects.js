import React, { Fragment } from "react";
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
import Footer from "../components/Footer";

const DUMMY_PROJECTS = [
  {
    id: "1",
    genre: genre.ANIMATION,
    projNamePl: "projNamePl1",
    projNameEn: "projNameEn1",
    completionDate: new Date("2013-11"),
    cityPL: "cityPL1",
    cityEn: "cityEn1",
    countryPL: "countryPL1",
    countryEn: "countryEn1",
    icoImg: ico1,
    type: [type.ANIMATION, type.COMPETITION],
  },
  {
    id: "2",
    genre: genre.ANIMATION,
    projNamePl: "projNamePl2",
    projNameEn: "projNameEn2",
    completionDate: new Date("2018-11"),
    cityPL: "cityPL2",
    cityEn: "cityEn2",
    countryPL: "countryPL2",
    countryEn: "countryEn2",
    icoImg: ico2,
    type: [type.ANIMATION],
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
    type: [type.EXTERIOR, type.INTERIOR, type.COMPETITION],
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
    type: [type.APP],
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
    type: [type.EXTERIOR, type.INTERIOR],
  },
];

const Projects = () => {
  const lang = useSelector((state) => state.language.lang);
  const projectsInProperLanguage = DUMMY_PROJECTS.map((project) => {
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
