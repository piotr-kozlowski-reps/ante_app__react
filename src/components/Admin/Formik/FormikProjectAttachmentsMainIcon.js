import React, { Fragment } from "react";

import FormikControl from "./FormikControl";

const FormikProjectAttachmentsMainIcon = (props) => {
  ////jsx
  return (
    <Fragment>
      <div className="row" id="parent">
        <p className="text-center title-new-project">PROJECT ATTACHMENTS</p>
      </div>

      <div className="form-row small-my">
        <div className="project-details">
          <div className="row" id="parent">
            <div className="form-row">
              <div className="project-details">
                <FormikControl
                  control="input"
                  type="text"
                  label="Main project icon"
                  name="icoImgFull"
                  placeholder="set main project icon"
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
                  label="Main project icon - thumbnail"
                  name="icoImgThumb"
                  placeholder="set main project icon thumbnail"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FormikProjectAttachmentsMainIcon;
