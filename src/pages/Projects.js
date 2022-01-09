import React, { Fragment } from "react";
import genre from "../shared/utils/genre";
import type from "../shared/utils/type";

import ProjectsList from "../components/Projects/ProjectsList";
import Carousel from "../components/Projects/Carousel";

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
    icoImg: "url",
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
    icoImg: "url",
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
    icoImg: "url",
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
    icoImg: "url",
    type: [type.APP],
  },
];

const Projects = () => {
  //
  //jsx
  return (
    <Fragment>
      <div data-testid="projects-page"></div>
      <Carousel />
      <ProjectsList projectsList={DUMMY_PROJECTS} />
    </Fragment>
  );
};

export default Projects;
