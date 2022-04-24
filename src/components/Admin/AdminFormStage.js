import React from "react";
import { useSelector } from "react-redux";

const AdminFormStage = () => {
  ////vars
  const formStageCounter = useSelector((state) => state.form.formStageCounter);

  ////jsx
  return (
    <div id="portfolio" className="container">
      <div className="row" id="parent">
        <div className="text-center">
          <div className="div-center">
            <div className="buttons">
              <ul id="progressbar">
                <li className="active" data-testid="choose-project-genre">
                  CHOOSE PROJECT GENRE
                </li>
                <li
                  data-testid="common-data"
                  className={
                    formStageCounter === 1 || formStageCounter === 2
                      ? "active"
                      : ""
                  }
                >
                  Common data
                </li>
                <li
                  className={formStageCounter === 2 ? "active" : ""}
                  data-testid="project-attachments"
                >
                  Project attachments
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFormStage;
