import React, { Fragment } from "react";

import Footer from "../shared/components/Footer";
import AdminTitle from "../components/Admin/AdminTitle";
import FormikContainer from "../components/Admin/FormikContainer";

const NewProject = () => {
  ////jsx
  return (
    <Fragment>
      <AdminTitle title="Create new project" />
      <FormikContainer />
      <Footer />
    </Fragment>
  );
};

export default NewProject;
