import React, { Fragment, useState, useEffect } from "react";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_COMPLETION_DATE,
  VALIDATOR_ARRAY_AT_LEAST_ONE,
} from "../../shared/utils/validators";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import Input from "../../shared/components/Input";
import type from "../../shared/utils/type";

const typeOptions = [
  { label: "COMPETITION", value: type.COMPETITION, isChecked: false },
  { label: "INTERIOR", value: type.INTERIOR, isChecked: false },
  { label: "EXTERIOR", value: type.EXTERIOR, isChecked: false },
  { label: "ANIMATION", value: type.ANIMATION, isChecked: false },
  { label: "PRODUCT MODELING", value: type.PRODUCT_MODELING, isChecked: false },
  { label: "PANORAMA", value: type.PANORAMA, isChecked: false },
  { label: "AR_APP", value: type.APP, isChecked: false },
];

const AdminCommon = (props) => {
  ////vars
  const formState = useSelector((state) => state.form.projectState);
  console.log(formState.projNamePl.value);

  ////jsx
  return (
    <Fragment>
      <div id="portfolio" className="container">
        <div className="row" id="parent">
          <p className="text-center title-new-project">COMMON DATA</p>
        </div>

        <div className="row" id="parent">
          <div className="form-row">
            <div className="project-details">
              <Input
                id="projNamePl"
                element="input"
                type="text"
                label="Nazwa projektu (po polsku)."
                placeholder="wpisz nazwę projektu"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Enter a valid 'Project Name' (at least 1 character), please."
                value={formState.projNamePl.isValid}
                isValid={formState.projNamePl.isValid}
                onInput={props.inputHandler}
              />
            </div>

            <div className="project-details">
              <Input
                id="projNameEn"
                element="input"
                type="text"
                label="Project name (in English)"
                placeholder="enter project name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Enter a valid 'Project Name' (at least 1 character), please."
                onInput={props.inputHandler}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="project-details">
              <Input
                id="cityPl"
                element="input"
                type="text"
                label="Miejscowość (po polsku)"
                placeholder="wpisz miejscowość gdzie wykonano projekt"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Enter a valid city (at least 1 character), please."
                onInput={props.inputHandler}
              />
            </div>

            <div className="project-details">
              <Input
                id="cityEn"
                element="input"
                type="text"
                label="City (in English)"
                placeholder="enter city name where project was build"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Enter a valid city (at least 1 character), please."
                onInput={props.inputHandler}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="project-details">
              <Input
                id="countryPL"
                element="input"
                type="text"
                label="Kraj (po polsku)"
                placeholder="wpisz kraj, w którym wykonano projekt"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Enter a valid country name (at least 1 character), please."
                onInput={props.inputHandler}
              />
            </div>

            <div className="project-details">
              <Input
                id="countryEn"
                element="input"
                type="text"
                label="Country (in English)"
                placeholder="enter country name where project was build"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Enter a valid country name (at least 1 character), please."
                onInput={props.inputHandler}
              />
            </div>
          </div>

          <div className="form-row section-my-bottom">
            <div className="project-details">
              <Input
                id="clientPL"
                element="input"
                type="text"
                label="Klient (po polsku)"
                placeholder="wpisz nazwę klienta"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Enter a valid client name (at least 1 character), please."
                onInput={props.inputHandler}
              />
            </div>

            <div className="project-details">
              <Input
                id="clientEn"
                element="input"
                type="text"
                label="Client (in English)"
                placeholder="enter client name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Enter a valid client name (at least 1 character), please."
                onInput={props.inputHandler}
              />
            </div>
          </div>

          <div className="div-center-no-py">
            <div className="separator"></div>
          </div>

          <div className="form-row small-my">
            <div className="project-details">
              <div className="row" id="parent">
                <p className="text-center title-new-project">Completion date</p>
              </div>
              <div className="div-center-no-margin">
                <Input
                  id="completionDate"
                  element="input"
                  type="date"
                  // label="Completion date "
                  additionalClass="width-shortener text-center"
                  placeholder="enter date of completion the project"
                  validators={[VALIDATOR_COMPLETION_DATE()]}
                  errorText="Enter a valid date (between 2000 and 2050), please."
                  onInput={props.inputHandler}
                />
              </div>
            </div>
          </div>

          <div className="div-center-no-py">
            <div className="separator"></div>
          </div>

          <div className="form-row small-my">
            <div className="project-details">
              <div className="row" id="parent">
                <p className="text-center title-new-project">
                  CHOOSE PROJECT TYPE
                </p>
              </div>
              <div className="div-center-no-py">
                <Input
                  id="type"
                  element="multiselect"
                  // type="date"
                  // label="Choose project type"
                  options={typeOptions}
                  // placeholder="enter date of completion the project"
                  validators={[VALIDATOR_ARRAY_AT_LEAST_ONE()]}
                  errorText="Choose at least one type of project, please."
                  onInput={props.inputHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AdminCommon.propTypes = {
  inputHandler: PropTypes.func,
  formState: PropTypes.object,
};
export default AdminCommon;
