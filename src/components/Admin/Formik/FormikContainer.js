import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";

function FormikContainer() {
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
      .nullable(),
    // .min(new Date("01-01-1990"))
    // .max(new Date("01-01-2050"))
  });
  const onSubmit = (values) => console.log("Form data: ", values);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form className="form">
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
                    />
                    {/* <Input

                      additionalClass="width-shortener text-center"

                    /> */}
                  </div>
                </div>
              </div>

              <button type="submit">submit</button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormikContainer;

// <div className="form-row small-my">
//   <div className="project-details">
//     <div className="row" id="parent">
//       <p className="text-center title-new-project">Completion date</p>
//     </div>
//     <div className="div-center-no-margin">
//       <Input
//         id="completionDate"
//         element="input"
//         type="date"
//         // label="Completion date "
//         additionalClass="width-shortener text-center"
//         placeholder="enter date of completion the project"
//         validators={[VALIDATOR_COMPLETION_DATE()]}
//         errorText="Enter a valid date (between 2000 and 2050), please."
//         onInput={props.inputHandler}
//       />
//     </div>
//   </div>
// </div>

//           <div className="div-center-no-py">
//             <div className="separator"></div>
//           </div>

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
