import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../../shared/store/form-slice";
import { useNavigate } from "react-router-dom";
import type from "../../shared/utils/type";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import Button from "../../shared/components/Button";
import AdminProjectItem from "./AdminProjectItem";
import { adminProjectsVariants } from "../../shared/utils/framerMotionAnimationsVariants";

const AdminProjectsList = (props) => {
  ////vars
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = useSelector((state) => state.language.lang);

  ////func
  const createNewProjectHandler = () => {
    dispatch(formActions.resetToInitialStage());
    navigate("/api/projects/new-project");
  };

  const projectTypeNamesInPolish = (projectType) => {
    switch (projectType) {
      case "all":
        return "wszystkie";

      case "competitions":
        return "konkursy";

      case "interiors":
        return "wnętrza";

      case "exteriors":
        return "zewnętrza";

      case "animations":
        return "animacje";

      case "3dmodeling":
        return "modelowanie produktów";

      case "panoramas":
        return "panoramy 360";

      case "apps":
        return "AR apps";

      default:
        return "wszystkie";
    }
  };

  ////jsx
  return (
    <div>
      <div id="portfolio" className="container">
        <div className="row" id="parent">
          <div className="row create-project-button">
            <div className="raw box-outer col-lg-9 col-md-9 col-sm-9 col-xs-12 col-xxxs-12"></div>

            <Button
              additionalClass="btn-portfolio"
              onClick={createNewProjectHandler}
            >
              {lang === "pl" ? "UTWÓRZ NOWY PROJEKT" : "CREATE NEW PROJECT"}
            </Button>
          </div>

          <div className="list-name">
            {lang === "pl"
              ? `lista projektów: ${projectTypeNamesInPolish(
                  props.projectType
                )}`
              : `list of projects: ${props.projectType} `}
          </div>

          {!props.projectsList ||
            (props.projectsList.length === 0 && (
              <div id="login" style={{ margin: "4.5rem 0 20rem 0" }}>
                <div className="project-details center">
                  <h2 style={{ fontSize: "18px" }}>No projects found</h2>
                </div>
              </div>
            ))}

          <motion.div className="row">
            <ol>
              {props.projectsList.map((project) => (
                <AdminProjectItem
                  key={project.id}
                  id={project.id}
                  projNamePl={project.projNamePl}
                  projNameEn={project.projNameEn}
                  completionDate={project.completionDate}
                  cityPl={project.cityPl}
                  cityEn={project.cityEn}
                  countryPl={project.countryPl}
                  countryEn={project.countryEn}
                  icoImgThumb={project.icoImgThumb}
                  onDelete={props.onDelete}
                  lang={lang}
                />
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

AdminProjectsList.propTypes = {
  projectsList: PropTypes.array,
  projectType: PropTypes.string,
  onDelete: PropTypes.func,
};

export default AdminProjectsList;
