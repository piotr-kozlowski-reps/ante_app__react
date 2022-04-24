import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import Button from "../../shared/components/Button";

const ProjectShowcaseFooter = ({ lang }) => {
  const navigate = useNavigate();

  console.log(lang);

  return (
    <div id="portfolio" className="container">
      <div className="row" id="parent">
        <div className="text-center">
          <div className="div-center-no-py">
            <div className="separator"></div>
          </div>
          <div className="text-center my-bottom">
            <Button
              className={`button button--default`}
              onClick={() => navigate("../")}
            >
              {lang === "pl" ? "POWRÓT DO PROJEKTÓW" : "BACK TO PROJECTS"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectShowcaseFooter.propTypes = {
  lang: PropTypes.string,
};

export default ProjectShowcaseFooter;
