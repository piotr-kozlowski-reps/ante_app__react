import React, { Fragment } from "react";

import AdminTitle from "../components/Admin/AdminTitle";
import FormikContainer from "../components/Admin/FormikContainer";

const NewProject = () => {
  ////jsx
  return (
    <Fragment>
      <AdminTitle title="Create new project" />
      <FormikContainer />
    </Fragment>
  );
};

export default NewProject;
