import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import type from "../shared/utils/type";
import { useSelector } from "react-redux";

import ProjectsList from "../components/Projects/ProjectsList";
import Carousel from "../components/Projects/Carousel";
import ProjectsTypeNavigation from "../components/Projects/ProjectsTypeNavigation";
import Footer from "../shared/components/Footer";

//tymczas

import { DUMMY_PROJECTS } from "../shared/utils/data-models";

const Projects = () => {
  //
  //vars
  const lang = useSelector((state) => state.language.lang);
  const [currentType, setCurrentType] = useState(type.ALL);
  const [currentProjectsArray, setCurrentProjectsArray] = useState([
    ...DUMMY_PROJECTS,
  ]);
  const [paginationNumber, setPaginationNumber] = useState(16);
  const [isShowMoreButtonShown, setIsShowMoreButtonShown] = useState(true);
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
  const projectsFiltered = currentProjectsArray
    .filter((project) => {
      if (currentType === type.ALL) return true;
      if (project.type.some((type) => type === currentType)) return true;
    })
    .sort((a, b) => b.completionDate - a.completionDate)
    .map((project) => {
      return {
        id: project.id,
        projName: lang === "pl" ? project.projNamePl : project.projNameEn,
        completionDate: project.completionDate,
        city: lang === "pl" ? project.cityPL : project.cityEn,
        country: lang === "pl" ? project.countryPL : project.countryEn,
        icoImg: project.icoImg,
      };
    });

  //add more projects to be shown
  const projectsPaginated = projectsFiltered.splice(0, paginationNumber);
  const allProjectsNumber = currentProjectsArray.length;
  const currentProjectsNumberToBeShown = projectsPaginated.length;
  const showMoreHandler = () => {
    if (currentProjectsNumberToBeShown < allProjectsNumber) {
      setPaginationNumber(
        (paginationNumber) => currentProjectsNumberToBeShown + paginationNumber
      );
    }
  };
  useEffect(() => {
    if (allProjectsNumber === currentProjectsNumberToBeShown)
      setIsShowMoreButtonShown(false);
  }, [allProjectsNumber, currentProjectsNumberToBeShown]);

  //
  //jsx
  return (
    <Fragment>
      <div data-testid="projects-page"></div>
      <Carousel />
      <ProjectsTypeNavigation />
      <ProjectsList
        projectsList={projectsPaginated}
        lang={lang}
        onClick={showMoreHandler}
        isShowMoreButtonShown={isShowMoreButtonShown}
      />
      <Footer />
    </Fragment>
  );
};

export default Projects;

//TODO: tests Projects: tests of choosing TYPES in Menu i pass proper array further
//TODO: tests Projects: tests if changing language also changes passed Array further
//TODO: tests Projects: tests of project 'pagination' - SHOW MORE button
