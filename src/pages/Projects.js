import React, { Fragment, useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import type from "../shared/utils/type";
import { useSelector } from "react-redux";
import { useTypeFiltering } from "../shared/hooks/type-filtering-hook";
import { useHttpClient } from "../shared/hooks/http-hook";

import ProjectsList from "../components/Projects/ProjectsList";
import Carousel from "../components/Projects/Carousel";
import ProjectsTypeNavigation from "../components/Projects/ProjectsTypeNavigation";
import Footer from "../shared/components/Footer";
import ErrorModal from "../shared/components/ErrorModal";
import LoadingSpinner from "../shared/components/LoadingSpinner";

const Projects = () => {
  ////vars
  const lang = useSelector((state) => state.language.lang);
  const [currentProjectsArray, setCurrentProjectsArray] = useState([]);
  const [paginationNumber, setPaginationNumber] = useState(8);
  const [isShowMoreButtonShown, setIsShowMoreButtonShown] = useState(true);

  //params
  const location = useLocation();
  const typeGotFromQuery =
    new URLSearchParams(location.search).get("type") || "all";

  //custom-hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  ////func
  //fetching projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}api/projects`
        );

        setCurrentProjectsArray(responseData.projects);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProjects();
  }, [sendRequest]);

  //custom-hook
  const projectsFilteredFromHook = useTypeFiltering(
    typeGotFromQuery,
    currentProjectsArray
  );

  //setting array of projects with desired language and projection
  const projectsFiltered = projectsFilteredFromHook.map((project) => {
    return {
      id: project.id,
      projName: lang === "pl" ? project.projNamePl : project.projNameEn,
      completionDate: new Date(project.completionDate),
      city: lang === "pl" ? project.cityPl : project.cityEn,
      country: lang === "pl" ? project.countryPl : project.countryEn,
      icoImg: project.icoImgFull,
    };
  });

  // triggering pagination of projects automatically when div#pagination-trigger on screen
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

  //add more projects to be shown
  const projectsPaginated = projectsFiltered
    ? projectsFiltered.splice(0, paginationNumber)
    : [];
  const allProjectsNumber = currentProjectsArray.length;
  const currentProjectsNumberToBeShown = projectsPaginated.length;
  const showMoreHandler = () => {
    if (currentProjectsNumberToBeShown < allProjectsNumber) {
      setPaginationNumber(
        (paginationNumber) => currentProjectsNumberToBeShown + paginationNumber
      );
    }
  };

  // useEffect(() => {
  //   if (allProjectsNumber === currentProjectsNumberToBeShown)
  //     setIsShowMoreButtonShown(false);
  // }, [allProjectsNumber, currentProjectsNumberToBeShown]);

  ////jsx
  return (
    <Fragment>
      <div data-testid="projects-page"></div>
      <ErrorModal
        error={error}
        onClear={clearError}
        headerClass="modal-header-mine__show-header-login"
      />
      {isLoading && <LoadingSpinner asOverlay />}
      <Carousel />
      <ProjectsTypeNavigation title="Portfolio" />
      {!isLoading && (
        <ProjectsList
          projectsList={projectsPaginated}
          lang={lang}
          isShowMoreButtonShown={isShowMoreButtonShown}
        />
      )}
      <div id="pagination-trigger" ref={refDivTriggeringPagination}></div>
      {/* <Footer /> */}
    </Fragment>
  );
};

export default Projects;
