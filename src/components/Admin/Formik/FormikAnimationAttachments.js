import React from "react";

import FormikControl from "./FormikControl";

const FormikAnimationAttachments = (props) => {
  ////jsx
  return (
    <div className="form-row small-my">
      <div className="project-details">
        <div className="row" id="parent">
          <p className="text-center title-new-project">VIDEO SOURCE INFO</p>
        </div>

        <div className="row" id="parent">
          <div className="form-row">
            <div className="project-details">
              <FormikControl
                control="input"
                type="text"
                label="Video source path"
                name="videoSource"
                placeholder="specify video source path"
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
                label="Video thumbnail"
                name="videoSourceThumb"
                placeholder="set video thumbnail"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormikAnimationAttachments;
