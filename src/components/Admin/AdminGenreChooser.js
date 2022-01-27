import React from "react";
import Button from "../../shared/components/Button";
import genre from "../../shared/utils/genre";

const AdminGenreChooser = () => {
  ////func

  return (
    <div id="portfolio" className="container">
      <div className="row" id="parent">
        <p className="text-center title-new-project">Choose project genre</p>
      </div>

      <div className="row" id="parent">
        <div className="text-center">
          <div className="div-center">
            <div className="buttons">
              <Button onClick={() => {}} additionalClass="btn-portfolio">
                GRAPHIC
              </Button>
              <Button onClick={() => {}} additionalClass="btn-portfolio">
                ANIMATION
              </Button>
              <Button onClick={() => {}} additionalClass="btn-portfolio">
                PANORAMA
              </Button>
              <Button onClick={() => {}} additionalClass="btn-portfolio">
                APP
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGenreChooser;
