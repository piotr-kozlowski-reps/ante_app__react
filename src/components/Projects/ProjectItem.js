import React, { forwardRef } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { iconsItemVariants } from "../../shared/utils/framerMotionAnimationsVariants";

const ProjectItem = (props) => {
  ////vars
  const { id, projName, completionDate, city, country, icoImg } = props.project;
  const lang = props.lang;
  const alt = `${format(
    completionDate,
    "MM-yyyy"
  )}. ${projName}, ${city}, ${country}.`;

  ////jsx
  return (
    <motion.div
      className="box-outer col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxxs-12 ext"
      variants={iconsItemVariants}
    >
      <div className="box" data-testid="project-item">
        <img src={icoImg} alt={alt} />
        <div className="more">
          <div className="project">
            <Link
              to={`/${lang}/projects/${id}`}
              className="link"
              data-testid="project-item-link"
            >
              <div className="desc">
                <h3 data-testid="project-item-name">
                  {projName.toUpperCase()}
                </h3>
                <h4 data-testid="project-item-date-city-country">
                  {`${format(
                    completionDate,
                    "yyyy"
                  )}/ ${city.toUpperCase()} [${country.toUpperCase()}]`}
                </h4>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

ProjectItem.propTypes = {
  project: PropTypes.exact({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    projName: PropTypes.string,
    completionDate: PropTypes.instanceOf(Date),
    city: PropTypes.string,
    country: PropTypes.string,
    icoImg: PropTypes.string,
  }).isRequired,
  lang: PropTypes.oneOf(["pl", "en"]).isRequired,
};

export default ProjectItem;
