import React, { Fragment, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import type from "../../../shared/utils/type";

import FormikControl from "./FormikControl";
import AdminFormStage from "../AdminFormStage";
import AdminGenreChooser from "../AdminGenreChooser";
import Footer from "../../../shared/components/Footer";
import AdminFormFooter from "../AdminFormFooter";

function FormikContainer() {
  ////vars
  const formStageCounter = useSelector((state) => state.form.formStageCounter);
  const typeCheckboxOptions = [
    { key: "COMPETITION", value: type.COMPETITION },
    { key: "INTERIOR", value: type.INTERIOR },
    { key: "EXTERIOR", value: type.EXTERIOR },
    { key: "ANIMATION", value: type.ANIMATION },
    { key: "PRODUCT MODELING", value: type.PRODUCT_MODELING },
    { key: "PANORAMA", value: type.PANORAMA },
    { key: "AR APP", value: type.APP },
  ];

  const initialValues = {
    projNamePl: "",
    projNameEn: "",
    cityPl: "",
    cityEn: "",
    countryPL: "",
    countryEn: "",
    clientPl: "",
    clientEn: "",
    completionDate: null,
    type: [],
  };

  const validationSchema = Yup.object({
    projNamePl: Yup.string().required("Entering 'Project Name' is required."),
    projNameEn: Yup.string().required("Entering 'Project Name' is required."),
    cityPl: Yup.string().required("Entering 'City Name' is required."),
    cityEn: Yup.string().required("Entering 'City Name' is required."),
    countryPL: Yup.string().required("Entering 'Country Name' is required."),
    countryEn: Yup.string().required("Entering 'Country Name' is required."),
    clientPl: Yup.string().required("Entering 'Client Name' is required."),
    clientEn: Yup.string().required("Entering 'Client Name' is required."),
    completionDate: Yup.date()
      .required("Entering 'Date' is required.")
      .min(new Date("01-01-1990"), "Date should be after: 12.12.1989")
      .max(new Date("01-01-2050"), "Date should be before: 12.12.2049")
      .nullable(),
    type: Yup.array()
      .required("At least one choosen genre is required")
      .min(1, "Choose at least one project genre."),
  });
  const onSubmit = (values) => console.log("Form data: ", values);

  return (
    <Fragment>
      <AdminFormStage />
      {formStageCounter === 0 && <AdminGenreChooser />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          console.log(formik.values);
          console.log(formik.errors);
          return (
            <Form className="form">
              {formStageCounter === 1 && (
                <div>
                  <div id="portfolio" className="container">
                    <div className="row" id="parent">
                      <p className="text-center title-new-project">
                        COMMON DATA
                      </p>
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

                    <div className="div-center-no-py">
                      <div className="separator"></div>
                    </div>

                    <div className="form-row small-my">
                      <div className="project-details">
                        <div className="row" id="parent">
                          <p className="text-center title-new-project">
                            Completion date
                          </p>
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

                        <FormikControl
                          control="checkbox"
                          type="date"
                          label=""
                          name="type"
                          options={typeCheckboxOptions}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <AdminFormFooter />
              {/* <button type="submit">submit</button> */}
            </Form>
          );
        }}
      </Formik>
      <Footer />
    </Fragment>
  );
}

export default FormikContainer;

//           <div className="form-row small-my">
//             <div className="project-details">
//               <div className="row" id="parent">
//                 <p className="text-center title-new-project">
//                   CHOOSE PROJECT TYPE
//                 </p>
//               </div>
//               <div className="div-center-no-py">
//                 <Input
//                   id="type"
//                   element="multiselect"
//                   // type="date"
//                   // label="Choose project type"
//                   options={typeOptions}
//                   // placeholder="enter date of completion the project"
//                   validators={[VALIDATOR_ARRAY_AT_LEAST_ONE()]}
//                   errorText="Choose at least one type of project, please."
//                   onInput={props.inputHandler}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Fragment>
