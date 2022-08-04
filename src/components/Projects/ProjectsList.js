import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import ProjectItem from "./ProjectItem";
import { iconsContainerVariants } from "../../shared/utils/framerMotionAnimationsVariants";

const ProjectsList = ({ projectsList, lang, onClick }) => {
  if (projectsList.length === 0) {
    //TODO: no projects found to look nicely
    return (
      <Fragment>
        <div id="login" style={{ margin: "4.5rem 0 20rem 0" }}>
          <div className="project-details center">
            <h2 style={{ fontSize: "18px" }}>No projects found</h2>
          </div>
        </div>
      </Fragment>
    );
  }

  ////jsx
  return (
    <div id="portfolio" className="container">
      <motion.div
        className="row"
        id="parent"
        variants={iconsContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {projectsList.map((project) => (
          <ProjectItem key={project.id} project={project} lang={lang} />
        ))}
      </motion.div>
    </div>
  );
};

ProjectsList.propTypes = {
  projectsList: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      projName: PropTypes.string,
      completionDate: PropTypes.instanceOf(Date),
      city: PropTypes.string,
      country: PropTypes.string,
      icoImg: PropTypes.string,
    })
  ).isRequired,
  lang: PropTypes.oneOf(["pl", "en"]).isRequired,
  onClick: PropTypes.func,
  isShowMoreButtonShown: PropTypes.bool,
};

export default ProjectsList;
