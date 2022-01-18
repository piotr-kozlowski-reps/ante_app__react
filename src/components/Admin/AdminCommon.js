import React, { Fragment } from "react";
import Input from "../../shared/components/Input";

const AdminCommon = () => {
  const submitFormHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Fragment>
      <div id="portfolio" class="container">
        <div className="row" id="parent">
          <form onSubmit={submitFormHandler}>
            <div className="form-row">
              <div className="project-details">
                <Input
                  element="input"
                  type="text"
                  label="Nazwa projektu"
                  validators={[]}
                  errorText="Error text"
                />
                {/*  <span className="details">Name (in Polish)</span>
                  <input
                    type="text"
                    th:field="*{namePl}"
                    placeholder="Name (in Polish)"
                    required
                  ></input>*/}
              </div>

              <div className="project-details">
                {/* <div class="input-box">
                  <span class="details">Name (in English)</span>
                  <input
                    type="text"
                    th:field="*{nameEn}"
                    placeholder="Name (in English)"
                    required
                  ></input>
                </div> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminCommon;
