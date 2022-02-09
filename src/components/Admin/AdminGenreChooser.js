import React from "react";
import genre from "../../shared/utils/genre";
import { useDispatch } from "react-redux";
import { formActions } from "../../shared/store/form-slice";

import Button from "../../shared/components/Button";

const AdminGenreChooser = () => {
  ////vars
  const dispatch = useDispatch();

  ////func
  const enableSecondStage = () => {
    dispatch(formActions.setNextStage());
  };

  const graphicButtonHandler = () => {
    enableSecondStage();
    dispatch(formActions.setGenreOfProject(genre.GRAPHIC));
  };
  const animationButtonHandler = () => {
    enableSecondStage();
    dispatch(formActions.setGenreOfProject(genre.ANIMATION));
  };
  const panoramaButtonHandler = () => {
    enableSecondStage();
    dispatch(formActions.setGenreOfProject(genre.PANORAMA));
  };
  const appButtonHandler = () => {
    enableSecondStage();
    dispatch(formActions.setGenreOfProject(genre.APP));
  };

  return (
    <div id="portfolio" className="container">
      <div className="row" id="parent">
        <p className="text-center title-new-project">Choose project genre</p>
      </div>

      <div className="row" id="parent">
        <div className="text-center">
          <div className="div-center-no-margin">
            <div className="buttons">
              <Button
                onClick={graphicButtonHandler}
                additionalClass="btn-portfolio"
              >
                GRAPHIC
              </Button>
              <Button
                onClick={animationButtonHandler}
                additionalClass="btn-portfolio"
              >
                ANIMATION
              </Button>
              <Button
                onClick={panoramaButtonHandler}
                additionalClass="btn-portfolio"
              >
                PANORAMA
              </Button>
              <Button
                onClick={appButtonHandler}
                additionalClass="btn-portfolio"
              >
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
