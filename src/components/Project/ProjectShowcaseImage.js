import React from "react";
import PropTypes from "prop-types";

const ProjectShowcaseImage = ({ imageSource, imageAlt, isBig }) => {
  return (
    <img
      className={isBig ? "big-img" : null}
      src={imageSource}
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

//TODO: check if image is well rendered with all the props passed
