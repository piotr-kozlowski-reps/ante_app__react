import React from "react";
import PropTypes from "prop-types";

const ProjectShowcaseImage = ({ imageSource, imageAlt, isBig }) => {
  ////jsx
  return (
    <img
      className={isBig ? "big-img" : null}
      src={`${process.env.REACT_APP_BACKEND_URL}${imageSource}`}
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
