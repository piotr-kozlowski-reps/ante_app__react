import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VALIDATOR_REQUIRE } from "../shared/utils/validators";
import { useForm } from "../shared/hooks/form-hook";

import Input from "../shared/components/Input";
import Button from "../shared/components/Button";

//temporary
import { DUMMY_PROJECT_GRAPHIC } from "../shared/utils/data-models";
const DUMMY_ARRAY = [DUMMY_PROJECT_GRAPHIC];

const UpdateProject = () => {
  //
  //vars
  const [isLoading, setIsLoading] = useState(true);
  const projectId = useParams().projectId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      projNamePl: {
        value: "",
        isValid: false,
      },
      projNameEn: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const foundProject = DUMMY_ARRAY.find((project) => project.id === projectId);

  //filling form with fetched data
  useEffect(() => {
    if (foundProject) {
      const fetchedFormDataInputs = {
        projNamePl: {
          value: foundProject.projNamePl,
          isValid: true,
        },
        projNameEn: {
          value: foundProject.projNameEn,
          isValid: true,
        },
      };
      setFormData(fetchedFormDataInputs, true);
    }

    setIsLoading(false);
  }, [setFormData, foundProject]);

  //
  //func
  const submitUpdatedProjectHandler = (event) => {
    event.preventDefault();
    console.log(formState);
  };

  if (!foundProject) return <h2>Could not find project with that id.</h2>;
  //TODO: make that info nice looking

  //TODO: later change the logic of showing form
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <form onSubmit={submitUpdatedProjectHandler}>
      <Input
        id="projNamePl"
        element="input"
        type="text"
        label="Nazwa projektu (po polsku)."
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Enter a valid 'Project Name' (at least 1 character), please ."
        onInput={inputHandler}
        initialValue={formState.inputs.projNamePl.value}
        initialValid={formState.inputs.projNamePl.isValid}
      />
      <Input
        id="projNameEn"
        element="input"
        type="text"
        label="Project name (in English)"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Enter a valid 'Project Name' (at least 1 character), please ."
        onInput={inputHandler}
        initialValue={formState.inputs.projNameEn.value}
        initialValid={formState.inputs.projNameEn.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        SUBMIT
      </Button>
    </form>
  );
};

export default UpdateProject;
