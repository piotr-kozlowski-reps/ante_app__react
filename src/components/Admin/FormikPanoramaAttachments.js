import React, { Fragment } from "react";

import { FieldArray } from "formik";
import FormikControl from "./FormikControl";

const FormikPanoramaAttachments = (props) => {
  ////jsx
  return (
    <div className="form-row small-my">
      <div className="project-details">
        <div className="row" id="parent">
          <p className="text-center title-new-project">PANORAMA IMAGES</p>
        </div>

        <FieldArray name="panoramas">
          {(fieldArrayProps) => {
            const { push, remove, form } = fieldArrayProps;
            const { values } = form;
            const { panoramas } = values;

            return panoramas.map((panorama, index) => (
              <Fragment key={index}>
                <div
                  className="image-set"
                  style={
                    index !== panoramas.length - 1
                      ? { marginBottom: "50px" }
                      : {}
                  }
                >
                  {/* pocz */}
                  <div className="row" id="parent">
                    <div className="form-row flex-changer">
                      <div className="project-details">
                        <FormikControl
                          control="input"
                          type="text"
                          label="Nazwa panoramy (po polsku)"
                          name={`panoramas.${index}.panoramaTitlePl`}
                          placeholder="wpisz nazwę panoramy"
                        />
                      </div>
                      <div className="project-details">
                        <FormikControl
                          control="input"
                          type="text"
                          label="Panorama name (in English)"
                          name={`panoramas.${index}.panoramaTitleEn`}
                          placeholder="enter panorama name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row" id="parent">
                    <div className="form-row">
                      <div className="project-details">
                        <FormikControl
                          control="image"
                          label="Panorama icon"
                          name={`panoramas.${index}.panoramaIcoFull`}
                          additionalText="(Provide only one file. Formats supported: .jpg .jpeg .png
                  .gif. Image with 351x351 px resolution.)"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row" id="parent">
                    <div className="form-row">
                      <div className="project-details">
                        <FormikControl
                          control="image"
                          label="Panorama image"
                          name={`panoramas.${index}.panoramaImageSourceFull`}
                          additionalText="(Provide only one file. Formats supported: .jpg .jpeg .png
                  .gif. Image 360 degrees panorama.)"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row" id="parent">
                    <div className="form-row align-to-right">
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className={`button button--default`}
                        >
                          DELETE
                        </button>
                      )}
                    </div>
                  </div>
                  {/* kon */}
                </div>
                {index === panoramas.length - 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      push({
                        panoramaTitlePl: "",
                        panoramaTitleEn: "",
                        panoramaIcoFull: "",
                        panoramaIcoThumb: "",
                        panoramaImageSourceFull: "",
                        panoramaImageSourceFullThumb: "",
                      })
                    }
                    className={`button button--default`}
                  >
                    ADD
                  </button>
                )}
              </Fragment>
            ));
          }}
        </FieldArray>
      </div>
    </div>
  );
};

export default FormikPanoramaAttachments;
