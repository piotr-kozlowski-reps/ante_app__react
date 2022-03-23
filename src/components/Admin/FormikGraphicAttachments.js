import React, { Fragment } from "react";

import { FieldArray, Field } from "formik";
import FormikControl from "./FormikControl";

const FormikGraphicAttachments = (props) => {
  ////options
  const isBigOptions = [
    { key: "yes - it's BIG", value: "true" },
    { key: "no - it's not BIG", value: "false" },
  ];

  ////jsx
  return (
    <div className="form-row small-my">
      <div className="project-details">
        <div className="row" id="parent">
          <p className="text-center title-new-project">IMAGES</p>
        </div>

        <FieldArray name="images">
          {(fieldArrayProps) => {
            const { push, remove, form } = fieldArrayProps;
            const { values } = form;
            const { images } = values;

            return images.map((image, index) => (
              <Fragment key={index}>
                <div
                  className="image-set"
                  style={
                    index !== images.length - 1 ? { marginBottom: "50px" } : {}
                  }
                >
                  {/* pocz */}
                  <div className="row" id="parent">
                    <div className="form-row flex-changer">
                      <div className="row" id="parent">
                        <div className="form-row">
                          <div className="project-details">
                            <FormikControl
                              control="image"
                              label="Image"
                              name={`images.${index}.imageSourceFull`}
                              additionalText="(Provide only one file. Formats supported: .jpg .jpeg .png
                  .gif.)"
                              additionalClass="image-upload-padding"
                            />
                          </div>
                        </div>
                      </div>
                      {/* <div className="project-details">
                        <FormikControl
                          control="input"
                          type="text"
                          label="Image path"
                          name={`images.${index}.imageSourceFull`}
                          placeholder="specify image source path"
                          additionalClass="input-wider"
                        />
                      </div> */}

                      <div className="project-details" style={{ width: "20%" }}>
                        <FormikControl
                          control="checkbox"
                          type="checkbox"
                          label="Is image big?"
                          name={`images.${index}.isBig`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* <div className="row" id="parent">
                    <div className="form-row">
                      <div className="project-details">
                        <FormikControl
                          control="input"
                          type="text"
                          label="Image thumbnail path"
                          name={`images.${index}.imageSourceThumb`}
                          placeholder="specify image thumbnail source path"
                        />
                      </div>
                    </div>
                  </div> */}

                  <div className="row" id="parent">
                    <div className="form-row">
                      <div className="project-details">
                        <FormikControl
                          control="input"
                          type="text"
                          label="Opis obrazu (ALT) (po polsku)"
                          name={`images.${index}.imageAltPl`}
                          placeholder="wpisz opis (ALT) dla wybranego obrazka"
                        />
                      </div>
                      <div className="project-details">
                        <FormikControl
                          control="input"
                          type="text"
                          label="Image description (ALT) (in English)"
                          name={`images.${index}.imageAltEn`}
                          placeholder="enter description (ALT) for chosen image"
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
                {index === images.length - 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      push({
                        imageSourceFull: "",
                        imageSourceThumb: "",
                        imageAltPl: "",
                        imageAltEn: "",
                        isBig: "false",
                      })
                    }
                    className={`button button--default`}
                  >
                    ADD NEXT IMAGE
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

export default FormikGraphicAttachments;
