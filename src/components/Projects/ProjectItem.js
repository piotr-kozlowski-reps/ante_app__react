import React, { forwardRef } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProjectItem = forwardRef((props, ref) => {
  ////vars
  const { id, projName, completionDate, city, country, icoImg } = props.project;
  const lang = props.lang;
  const alt = `${format(
    completionDate,
    "MM-yyyy"
  )}. ${projName}, ${city}, ${country}.`;

  ////jsx
  return (
    <div
      ref={ref}
      className="box-outer col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxxs-12 ext"
    >
      <div className="box">
        <img src={icoImg} alt={alt} />
        <div className="more">
          <div className="project">
            <Link to={`/${lang}/projects/${id}`} className="link">
              <div className="desc">
                <h3>{projName.toUpperCase()}</h3>
                <h4>
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
    </div>
  );
});

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
