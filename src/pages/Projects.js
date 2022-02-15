import React, { Fragment, useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import type from "../shared/utils/type";
import { useSelector } from "react-redux";

import ProjectsList from "../components/Projects/ProjectsList";
import Carousel from "../components/Projects/Carousel";
import ProjectsTypeNavigation from "../components/Projects/ProjectsTypeNavigation";
import Footer from "../shared/components/Footer";

//tymczas
import { DUMMY_PROJECTS } from "../shared/utils/data-models";
import { useTypeFiltering } from "../shared/hooks/type-filtering-hook";

const Projects = () => {
  ////vars
  const lang = useSelector((state) => state.language.lang);
  const [currentProjectsArray, setCurrentProjectsArray] = useState([
    ...DUMMY_PROJECTS,
  ]);
  const [paginationNumber, setPaginationNumber] = useState(8);
  const [isShowMoreButtonShown, setIsShowMoreButtonShown] = useState(true);

  //params
  const location = useLocation();
  const typeGotFromQuery =
    new URLSearchParams(location.search).get("type") || "all";

  //hooks
  const projectsFilteredFromHook = useTypeFiltering(
    typeGotFromQuery,
    currentProjectsArray
  );

  //func
  //setting array of projects with desired language and projection
  const projectsFiltered = projectsFilteredFromHook.map((project) => {
    return {
      id: project.id,
      projName: lang === "pl" ? project.projNamePl : project.projNameEn,
      completionDate: project.completionDate,
      city: lang === "pl" ? project.cityPl : project.cityEn,
      country: lang === "pl" ? project.countryPl : project.countryEn,
      icoImg: project.icoImgFull,
    };
  });

  // triggering pagination of projects automaticaly when div#pagination-trigger on screen
  let refDivTriggeringPagination = useRef();
  const isInViewport = (ref, offset = 0) => {
    if (!ref.current) return false;
    const top = ref.current.getBoundingClientRect().top;
    return top + offset >= 0 && top - offset <= window.innerHeight;
  };
  const scrollOfDivTriggeringPaginationHandler = () => {
    if (isInViewport(refDivTriggeringPagination)) {
      showMoreHandler();
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollOfDivTriggeringPaginationHandler);

    return () => {
      window.removeEventListener(
        "scroll",
        scrollOfDivTriggeringPaginationHandler
      );
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

  ////jsx
  return (
    <Fragment>
      <div data-testid="projects-page"></div>
      <Carousel />
      <ProjectsTypeNavigation title="Portfolio" />
      <ProjectsList
        projectsList={projectsPaginated}
        lang={lang}
        isShowMoreButtonShown={isShowMoreButtonShown}
      />
      <div id="pagination-trigger" ref={refDivTriggeringPagination}></div>
      <Footer />
    </Fragment>
  );
};

export default Projects;

//TODO: tests Projects: tests of choosing TYPES in Menu i pass proper array further
//TODO: tests Projects: tests if changing language also changes passed Array further
//TODO: tests Projects: tests of project 'pagination' - SHOW MORE button
