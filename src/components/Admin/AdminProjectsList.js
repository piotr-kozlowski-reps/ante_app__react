import React from "react";
import { useDispatch } from "react-redux";
import { formActions } from "../../shared/store/form-slice";
import { useNavigate } from "react-router-dom";

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

        <div className="row">
          <ol>
            {props.projectsList.map((project) => (
              <AdminProjectItem
                key={project.id}
                id={project.id}
                projNamePl={project.projNamePl}
                projNameEn={project.projNameEn}
                completionDate={project.completionDate}
                cityPL={project.cityPL}
                cityEn={project.cityEn}
                countryPL={project.countryPL}
                countryEn={project.countryEn}
                icoImgThumb={project.icoImgThumb}
              />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AdminProjectsList;
