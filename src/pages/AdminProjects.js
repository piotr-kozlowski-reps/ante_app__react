import React, { Fragment, useState, useEffect } from "react";
import { useTypeFiltering } from "../shared/hooks/type-filtering-hook";
import { useLocation } from "react-router-dom";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useSelector } from "react-redux";

import ProjectsTypeNavigation from "../components/Projects/ProjectsTypeNavigation";
import AdminProjectsList from "../components/Admin/AdminProjectsList";
import LoadingSpinner from "../shared/components/LoadingSpinner";
import ErrorModal from "../shared/components/ErrorModal";

const AdminProjects = () => {
  ////vars
  const [currentProjectsArray, setCurrentProjectsArray] = useState([]);
  const location = useLocation();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const lang = useSelector((state) => state.language.lang);

  const typeGotFromQuery =
    new URLSearchParams(location.search).get("type") || "all";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}api/projects`
        );
        // const sortedProjects = sortProjectsByData(responseData.projects);
        setCurrentProjectsArray(responseData.projects);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects();
  }, [sendRequest]);

  const filteredProjects = useTypeFiltering(
    typeGotFromQuery,
    currentProjectsArray
  );

  //desired projection
  let projectsProjected = filteredProjects.map((project) => {
    return {
      id: project.id,
      projNamePl: project.projNamePl,
      projNameEn: project.projNameEn,
      completionDate: new Date(project.completionDate),
      cityPl: project.cityPl,
      cityEn: project.cityEn,
      countryPl: project.countryPl,
      countryEn: project.countryEn,
      icoImgThumb: project.icoImgThumb,
    };
  });

  const deleteProjectHandler = (id) => {
    setCurrentProjectsArray(
      projectsProjected.filter((project) => project.id !== id)
    );
  };

  ////jsx
  return (
    <Fragment>
      {isLoading && <LoadingSpinner asOverlay />}

      <ErrorModal
        error={error}
        onClear={clearError}
        headerClass="modal-header-mine__show-header-login"
      />
      <ProjectsTypeNavigation
        title={lang === "pl" ? "LISTA PROJEKTÓW" : "PROJECTS LIST"}
        additionalTitleClass="py-admin"
      />
      <AdminProjectsList
        projectsList={projectsProjected}
        projectType={typeGotFromQuery}
        onDelete={deleteProjectHandler}
      />
      {/* <Footer /> */}
    </Fragment>
  );
};

export default AdminProjects;
