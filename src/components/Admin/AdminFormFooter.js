import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../../shared/store/form-slice";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import Button from "../../shared/components/Button";

const AdminFormFooter = (props) => {
  ////vars
  const formStageCounter = useSelector((state) => state.form.formStageCounter);
  const formInputsStates = useSelector((state) => state.form.projectState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  ////func
  const cancelHandler = () => {
    navigate("../../api/projects");
    dispatch(formActions.resetToInitialStage());
  };
  const backHandler = () => {
    console.log("backHandler");
    dispatch(formActions.setPreviousStage());
  };
  const nextHandler = () => {
    console.log("next handler");
    dispatch(formActions.setNextStage());
  };

  //next button activness
  let isNextActive = true;
  if (formStageCounter === 0) isNextActive = false;
  if (
    !formInputsStates ||
    !formInputsStates.projNamePl.isValid ||
    !formInputsStates.projNameEn.isValid ||
    !formInputsStates.cityPl.isValid ||
    !formInputsStates.cityEn.isValid ||
    !formInputsStates.countryPL.isValid ||
    !formInputsStates.countryEn.isValid ||
    !formInputsStates.clientPL.isValid ||
    !formInputsStates.clientEn.isValid ||
    !formInputsStates.completionDate.isValid ||
    !formInputsStates.type.isValid
  )
    isNextActive = false;

  //content
  let content;
  if (props.isShowCancelOnly) {
    content = (
      <Fragment>
        <div className="div-center-no-py">
          <div className="separator"></div>
        </div>

        <div className="text-center my-bottom no-form-button">
          <div onClick={cancelHandler} className={`button button--default `}>
            CANCEL
          </div>

          <div
            onClick={backHandler}
            className={`button button--default no-form-button button-as-div-disabled`}
          >
            BACK
          </div>
          <div
            onClick={isNextActive ? nextHandler : null}
            className={`button button--default no-form-button button-as-div-disabled`}
          >
            NEXT
          </div>
          <div
            onClick={isNextActive ? nextHandler : null}
            className={`button button--default no-form-button button-as-div-disabled`}
          >
            SUBMIT
          </div>
        </div>
      </Fragment>
    );
  } else {
    content = (
      <Fragment>
        <div className="div-center-no-py">
          <div className="separator"></div>
        </div>
        <div className="text-center my-bottom">
          <div onClick={cancelHandler} className={`button button--default`}>
            CANCEL
          </div>
          <div
            onClick={backHandler}
            className={`button button--default ${
              formStageCounter === 0 ? "button-as-div-disabled" : ""
            }`}
          >
            BACK
          </div>
          <div
            onClick={isNextActive ? nextHandler : null}
            className={`button button--default ${
              isNextActive ? "" : "button-as-div-disabled"
            }`}
          >
            NEXT
          </div>
          {/* //TODO: submit form from div */}
          <div
            onClick={isNextActive ? nextHandler : null}
            className={`button button--default ${
              props.formState.isValid ? "" : "button-as-div-disabled"
            }`}
          >
            SUBMIT
          </div>
        </div>
      </Fragment>
    );
  }

  ////jsx
  return (
    <div id="portfolio" className="container">
      <div className="row" id="parent">
        <div className="text-center my-top">{content}</div>
      </div>
    </div>
  );
};

AdminFormFooter.propTypes = {
  formState: PropTypes.object,
  isShowCancelOnly: PropTypes.bool,
};

export default AdminFormFooter;
