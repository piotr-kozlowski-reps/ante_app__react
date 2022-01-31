import React, { Fragment, useState, useEffect } from "react";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_COMPLETION_DATE,
} from "../../shared/utils/validators";
import PropTypes from "prop-types";

import Input from "../../shared/components/Input";
import type from "../../shared/utils/type";

const typeOptions = [
  { label: "COMPETITION", value: type.COMPETITION, isChecked: false },
  { label: "INTERIOR", value: type.INTERIOR, isChecked: false },
  { label: "EXTERIOR", value: type.EXTERIOR, isChecked: false },
  { label: "ANIMATION", value: type.ANIMATION, isChecked: false },
  { label: "PRODUCT MODELING", value: type.PRODUCT_MODELING, isChecked: false },
  { label: "PANORAMA", value: type.PANORAMA, isChecked: true },
  { label: "AR_APP", value: type.APP, isChecked: false },
];

const AdminCommon = (props) => {
  ////vars

  // let typeArray = props.formState.inputs.type.value;
  // console.log(typeArray);

  ////func
  // const typeCompetitionHandler = (event) => {
  //   setIsCompetitionChecked((beforeState) => !beforeState);
  // };
  // //update form state array
  // useEffect(() => {
  //   if (isCompetitionChecked) {
  //     const isCompetitionSet = typeArray.find((t) => t === type.COMPETITION);
  //     if (!isCompetitionSet) typeArray.push(type.COMPETITION);
  //   } else {
  //     typeArray = typeArray.filter((t) => t !== type.COMPETITION);
  //   }
  // }, [isCompetitionChecked, typeArray]);

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
              <Input
                id="completionDate"
                element="input"
                type="date"
                // label="Completion date "
                placeholder="enter date of completion the project"
                validators={[VALIDATOR_COMPLETION_DATE()]}
                errorText="Enter a valid date (between 2000 and 2050), please."
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
                  validators={[]}
                  errorText="Choose at least one type for project, please."
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

// <div className="row" id="parent">
//   <p className="text-center title-new-project-between">
//     CHOOSE PROJECT TYPE
//   </p>
// </div>

// <div className="project-types">
//   <div className="checbox-container">
//     <input
//       type="checkbox"
//       id="competition"
//       value="COMPETITION"
//       onChange={typeCompetitionHandler}
//       checked={isCompetitionChecked}
//     />
//     <label htmlFor="competition">COMPETITION</label>
//   </div>

//   <div className="checbox-container">
//     <input type="checkbox" id="interior" />
//     <label htmlFor="interior">INTERIOR</label>
//   </div>

//   <div className="checbox-container">
//     <input type="checkbox" id="exterior" />
//     <label htmlFor="exterior">EXTERIOR</label>
//   </div>

//   <div className="checbox-container">
//     <input type="checkbox" id="animation" />
//     <label htmlFor="animation">ANIMATION</label>
//   </div>

//   <div className="checbox-container">
//     <input type="checkbox" id="productmodel" />
//     <label htmlFor="productmodel">PRODUCT_MODEL</label>
//   </div>

//   <div className="checbox-container">
//     <input type="checkbox" id="panorama" />
//     <label htmlFor="panorama">PANORAMA</label>
//   </div>

//   <div className="checbox-container">
//     <input type="checkbox" id="arapp" />
//     <label htmlFor="arapp">AR_APP</label>
//   </div>
// </div>
