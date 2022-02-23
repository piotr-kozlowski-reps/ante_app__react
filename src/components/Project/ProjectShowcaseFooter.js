import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../shared/components/Button";

const ProjectShowcaseFooter = () => {
  const navigate = useNavigate();

  return (
    <div id="portfolio" className="container">
      <div className="row" id="parent">
        <div className="text-center">
          <div className="div-center-no-py">
            <div className="separator"></div>
          </div>
          <div className="text-center my-bottom">
            {/* <button
              type="button"
              onClick={() => {}}
              className={`button button--default`}
            >
              BACK TO PROJECTS
            </button> */}

            <Button
              className={`button button--default`}
              onClick={() => navigate(-1)}
            >
              BACK TO PROJECTS
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcaseFooter;
