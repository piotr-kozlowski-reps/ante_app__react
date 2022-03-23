import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { formActions } from "../../shared/store/form-slice";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import Button from "../../shared/components/Button";
import AdminProjectItem from "./AdminProjectItem";

const AdminProjectsList = (props) => {
  ////vars
  const dispatch = useDispatch();
  const navigate = useNavigate();

  ////func
  const createNewProjectHandler = () => {
    dispatch(formActions.resetToInitialStage());
    navigate("/api/projects/new-project");
  };

  ////jsx
  return (
    <Fragment>
      <div id="portfolio" className="container">
        <div className="row" id="parent">
          <div className="row create-project-button">
            <div className="raw box-outer col-lg-9 col-md-9 col-sm-9 col-xs-12 col-xxxs-12"></div>

            <Button
              additionalClass="btn-portfolio"
              onClick={createNewProjectHandler}
            >
              CREATE NEW PROJECT
            </Button>
          </div>

          <div className="list-name">{`list of: ${props.projectType} `}</div>

          {!props.projectsList ||
            (props.projectsList.length === 0 && (
              <div id="login" style={{ margin: "4.5rem 0 20rem 0" }}>
                <div className="project-details center">
                  <h2 style={{ fontSize: "18px" }}>No projects found</h2>
                </div>
              </div>
            ))}

          <div className="row">
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
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AdminProjectsList.propTypes = {
  projectsList: PropTypes.array,
  projectType: PropTypes.string,
  onDelete: PropTypes.func,
};

export default AdminProjectsList;
