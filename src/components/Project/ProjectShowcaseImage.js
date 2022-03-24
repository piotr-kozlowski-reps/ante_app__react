import React from "react";
import PropTypes from "prop-types";

import URL_BASE from "../../shared/utils/url-base";

const ProjectShowcaseImage = ({ imageSource, imageAlt, isBig }) => {
  ////jsx
  return (
    <img
      className={isBig ? "big-img" : null}
      src={`${URL_BASE}${imageSource}`}
      alt={imageAlt}
    ></img>
  );
};

ProjectShowcaseImage.propTypes = {
  imageSource: PropTypes.string,
  imageAlt: PropTypes.string,
  isBig: PropTypes.bool,
};

export default ProjectShowcaseImage;
