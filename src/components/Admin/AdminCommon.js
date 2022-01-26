import React, { Fragment, useCallback } from "react";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";

import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";

//
//vars before
const initialInputs = {
  projNamePl: {
    value: "",
    isValid: false,
  },
  projNameEn: {
    value: "",
    isValid: false,
  },
};

const AdminCommon = () => {
  //
  //vars
  const [formState, inputHandler] = useForm(initialInputs, false);

  //
  //func
  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <Fragment>
      <div id="portfolio" className="container">
        <div className="row" id="parent">
          <form onSubmit={submitFormHandler}>
            <div className="form-row">
              <div className="project-details">
                <Input
                  id="projNamePl"
                  element="input"
                  type="text"
                  label="Nazwa projektu (po polsku)."
                  placeholder="wpisz nazwę projektu"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Enter a valid 'Project Name' (at least 1 character), please ."
                  onInput={inputHandler}
                />
              </div>

              <div className="project-details">
                <Input
                  id="projNameEn"
                  element="input"
                  type="text"
                  label="Project name (in English)"
                  placeholder="enter project name"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Enter a valid 'Project Name' (at least 1 character), please ."
                  onInput={inputHandler}
                />
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
            <Button type="submit" disabled={!formState.isValid}>
              SUBMIT
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminCommon;
