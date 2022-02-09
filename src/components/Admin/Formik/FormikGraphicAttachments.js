import React from "react";

import { FieldArray } from "formik";
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
              <div className="image-set" key={index}>
                {/* pocz */}
                <div className="row" id="parent">
                  <div className="form-row">
                    <div className="project-details">
                      <FormikControl
                        control="input"
                        type="text"
                        label="Image path"
                        name={`images.${index}.imageSourceFull`}
                        placeholder="specify image source path"
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
                        label="Image thumbnail path"
                        name={`images.${index}.imageSourceThumb`}
                        placeholder="specify image thumbnail source path"
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
                  <div className="form-row">
                    <div className="project-details-radios">
                      <FormikControl
                        control="radio"
                        type="text"
                        label="Is image big?"
                        name={`images.${index}.isBig`}
                        options={isBigOptions}
                      />
                    </div>
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className={`button button--default`}
                    >
                      DELETE
                    </button>
                  )}

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
                    ADD
                  </button>
                </div>
                {/* kon */}
              </div>
            ));
          }}
        </FieldArray>
      </div>
    </div>
  );
};

export default FormikGraphicAttachments;
