import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import AdminGenreChooser from "../components/Admin/AdminGenreChooser";
import Footer from "../shared/components/Footer";
import AdminFormStage from "../components/Admin/AdminFormStage";
import AdminFormFooter from "../components/Admin/AdminFormFooter";
import AdminForm from "../components/Admin/AdminForm";

import AdminTitle from "../components/Admin/AdminTitle";
import Input from "../shared/components/Input";
import FormikContainer from "../components/Admin/Formik/FormikContainer";

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

  ////jsx
  return (
    <Fragment>
      <AdminTitle title="Create new project" />
      <FormikContainer />
      {/* <AdminFormStage /> */}
      {/* {formStageCounter === 0 && <AdminGenreChooser />}
      {formStageCounter !== 0 && <FormikContainer />} */}
      {/* <Footer /> */}

      {/* <AdminFormStage />
      {formStageCounter === 0 && <AdminGenreChooser />}
      {(formStageCounter === 1 || formStageCounter === 2) && <AdminForm />}
      {formStageCounter === 0 && <AdminFormFooter isShowCancelOnly={true} />}
      <Footer /> */}
    </Fragment>
  );
};

export default NewProject;
