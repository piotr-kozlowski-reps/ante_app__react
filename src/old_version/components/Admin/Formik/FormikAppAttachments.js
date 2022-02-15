import React from "react";

import FormikControl from "./FormikControl";

const FormikAppAttachments = (props) => {
  return (
    <div className="form-row small-my">
      <div className="project-details">
        <div className="row" id="parent">
          <p className="text-center title-new-project">APP INFO</p>
        </div>

        <div className="row" id="parent">
          <div className="form-row">
            <div className="project-details">
              <FormikControl
                control="input"
                type="text"
                label="Nazwa aplikacji (po polsku)"
                name="appInfo.appNamePl"
                placeholder="wpisz nazwę aplikacji"
              />
            </div>

            <div className="project-details">
              <FormikControl
                control="input"
                type="text"
                label="Application name (in English)"
                name="appInfo.appNameEn"
                placeholder="enter application name"
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
                label="Application image"
                name="appInfo.appImageFull"
                placeholder="specify application image source path"
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
                label="Application image thumbnail"
                name="appInfo.appImageThumb"
                placeholder="specify application image thumbnail source path"
              />
            </div>
          </div>
        </div>

        <div className="row" id="parent">
          <div className="form-row">
            <div className="project-details">
              <FormikControl
                control="textarea"
                type="textarea"
                label="Opis aplikacji (po polsku)"
                name="appInfo.appDescriptionPl"
                placeholder="wpisz opis aplikacji"
              />
            </div>
          </div>
        </div>

        <div className="row" id="parent">
          <div className="form-row">
            <div className="project-details">
              <FormikControl
                control="textarea"
                type="textarea"
                label="Application description (in English)"
                name="appInfo.appDescriptionEn"
                placeholder="enter application description"
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
                label="Application android link"
                name="appInfo.appAndroidLink"
                placeholder="specify link to android application "
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
                label="Application iOS link"
                name="appInfo.appIOSLink"
                placeholder="specify link to iOS application "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormikAppAttachments;
