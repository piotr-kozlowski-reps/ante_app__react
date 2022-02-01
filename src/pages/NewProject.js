import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { formActions } from "../shared/store/form-slice";

import AdminCommon from "../components/Admin/AdminCommon";
import AdminGenreChooser from "../components/Admin/AdminGenreChooser";
import AdminTitle from "../components/Admin/AdminTitle";
import Footer from "../shared/components/Footer";
import AdminFormStage from "../components/Admin/AdminFormStage";
import AdminFormFooter from "../components/Admin/AdminFormFooter";
import { useForm } from "../shared/hooks/form-hook";
import AdminItems from "../components/Admin/AdminItems";

////vars before
const initialInputs = {
  projNamePl: {
    value: "",
    isValid: false,
  },
  projNameEn: {
    value: "",
    isValid: false,
  },
  cityPl: {
    value: "",
    isValid: false,
  },
  cityEn: {
    value: "",
    isValid: false,
  },
  countryPL: {
    value: "",
    isValid: false,
  },
  countryEn: {
    value: "",
    isValid: false,
  },
  clientPL: {
    value: "",
    isValid: false,
  },
  clientEn: {
    value: "",
    isValid: false,
  },
  completionDate: {
    value: null,
    isValid: false,
  },
  type: {
    value: [],
    isValid: false,
  },
};

const NewProject = () => {
  ////vars
  const formStageCounter = useSelector((state) => state.form.formStageCounter);
  const [formState, inputHandler, setFormData] = useForm(initialInputs, false);

  ////func
  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  ////jsx
  return (
    <Fragment>
      <AdminTitle title="Create new project" />
      <AdminFormStage />
      {formStageCounter === 0 && <AdminGenreChooser />}

      <form onSubmit={submitFormHandler}>
        {formStageCounter === 1 && (
          <AdminCommon inputHandler={inputHandler} formState={formState} />
        )}
        {formStageCounter === 2 && <AdminItems />}
        <AdminFormFooter formState={formState} />
      </form>
      <Footer />
    </Fragment>
  );
};

export default NewProject;
