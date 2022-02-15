import React from "react";
import PropTypes from "prop-types";

const ProjectShowcaseVideo = ({ videoSource }) => {
  return (
    <iframe
      width="853"
      height="480"
      src={videoSource}
      frameborder="0"
      allowfullscreen=""
    ></iframe>
  );
};

ProjectShowcaseVideo.propTypes = {
  videoSource: PropTypes.string,
};

export default ProjectShowcaseVideo;