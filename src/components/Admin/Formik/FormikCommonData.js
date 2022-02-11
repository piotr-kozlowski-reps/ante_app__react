import React from "react";
import { Formik, Form } from "formik";
import type from "../../../shared/utils/type";

import FormikControl from "./FormikControl";
import Separator from "../../../shared/components/Separator";

const FormikCommonData = (props) => {
  ////options
  const typeCheckboxOptions = [
    { key: "COMPETITION", value: type.COMPETITION },
    { key: "INTERIOR", value: type.INTERIOR },
    { key: "EXTERIOR", value: type.EXTERIOR },
    { key: "ANIMATION", value: type.ANIMATION },
    { key: "PRODUCT MODELING", value: type.PRODUCT_MODELING },
    { key: "PANORAMA", value: type.PANORAMA },
    { key: "AR APP", value: type.APP },
  ];

  ///jsx
  return (
    <div>
      <div id="portfolio" className="container">
        <div className="row" id="parent">
          <p className="text-center title-new-project">COMMON DATA</p>
        </div>

        <div className="row" id="parent">
          <div className="form-row">
            <div className="project-details">
              <FormikControl
                control="input"
                type="text"
                label="Nazwa projektu (po polsku)."
                name="projNamePl"
                placeholder="wpisz nazwę projektu"
              />
            </div>

            <div className="project-details">
              <FormikControl
                control="input"
                type="text"
                label="Project name (in English)"
                name="projNameEn"
                placeholder="enter project name"
              />
            </div>
          </div>
        </div>

        <div className="row" id="parent">
          <div className="form-row">
            <div className="project-details">
              <FormikControl
                control="input"
                type="text"
                label="Miejscowość (po polsku)"
                name="cityPl"
                placeholder="wpisz miejscowość, w której wykonano projekt"
              />
            </div>

            <div className="project-details">
              <FormikControl
                control="input"
                type="text"
                label="City (in English)"
                name="cityEn"
                placeholder="enter city name, where project was build"
              />
            </div>
          </div>
        </div>

        <div className="row" id="parent">
          <div className="form-row">
            <div className="project-details">
              <FormikControl
                control="input"
                type="text"
                label="Kraj (po polsku)"
                name="countryPL"
                placeholder="wpisz kraj, w którym wykonano projekt"
              />
            </div>

            <div className="project-details">
              <FormikControl
                control="input"
                type="text"
                label="Country (in English)"
                name="countryEn"
                placeholder="enter country name where project was build"
              />
            </div>
          </div>
        </div>

        <div className="row" id="parent">
          <div className="form-row">
            <div className="project-details">
              <FormikControl
                control="input"
                type="text"
                label="Klient (po polsku)"
                name="clientPl"
                placeholder="wpisz nazwę klienta"
              />
            </div>

            <div className="project-details">
              <FormikControl
                control="input"
                type="text"
                label="Client (in English)"
                name="clientEn"
                placeholder="enter client name"
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="form-row small-my">
          <div className="project-details">
            <div className="row" id="parent">
              <p className="text-center title-new-project">Completion date</p>
            </div>
            <div className="div-center-no-margin">
              <FormikControl
                control="date"
                type="date"
                label=""
                name="completionDate"
                placeholder="enter date of completion the project"
                additionalClass="width-shortener text-center"
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="form-row small-my">
          <div className="project-details">
            <div className="row" id="parent">
              <p className="text-center title-new-project">
                CHOOSE PROJECT TYPE
              </p>
            </div>

            <FormikControl
              control="checkboxGroup"
              type="checkbox"
              label=""
              name="type"
              options={typeCheckboxOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormikCommonData;
