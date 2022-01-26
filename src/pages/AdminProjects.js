import React, { Fragment, useState } from "react";
import { useTypeFiltering } from "../shared/hooks/type-filtering-hook";

import ProjectsTypeNavigation from "../components/Projects/ProjectsTypeNavigation";
import AdminProjectsList from "../components/Admin/AdminProjectsList";
import Footer from "../shared/components/Footer";

////temporary
import { DUMMY_PROJECTS } from "../shared/utils/data-models";
import { useLocation } from "react-router-dom";

const AdminProjects = () => {
  ////vars
  const [currentProjectsArray, setCurrentProjectsArray] = useState([
    ...DUMMY_PROJECTS,
  ]);
  const location = useLocation();
  const typeGotFromQuery =
    new URLSearchParams(location.search).get("type") || "all";
  const filteredProjects = useTypeFiltering(
    typeGotFromQuery,
    currentProjectsArray
  );

  //desired projection
  const projectsProjected = filteredProjects.map((project) => {
    return {
      id: project.id,
      projNamePl: project.projNamePl,
      projNameEn: project.projNameEn,
      completionDate: project.completionDate,
      cityPL: project.cityPL,
      cityEn: project.cityEn,
      countryPL: project.countryPL,
      countryEn: project.countryEn,
      icoImgThumb: project.icoImgThumb,
    };
  });

  ////jsx
  return (
    <Fragment>
      <ProjectsTypeNavigation
        title="PROJECTS LIST"
        additionalTitleClass="py-admin"
      />
      <AdminProjectsList projectsList={projectsProjected} />
      <Footer />
    </Fragment>
  );
};

export default AdminProjects;
