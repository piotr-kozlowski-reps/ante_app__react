import React, { Fragment } from "react";
import { motion } from "framer-motion";

import AdminTitle from "../components/Admin/AdminTitle";
import FormikContainer from "../components/Admin/FormikContainer";
import { containerVariants } from "../shared/utils/framerMotionAnimationsVariants";

const NewProject = () => {
  ////jsx
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <AdminTitle title="Create new project" />
      <FormikContainer />
    </motion.div>
  );
};

export default NewProject;
