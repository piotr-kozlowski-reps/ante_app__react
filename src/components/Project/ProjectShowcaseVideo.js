import React from "react";
import PropTypes from "prop-types";

const ProjectShowcaseVideo = ({ videoSource }) => {
  ////jsx
  return (
    <iframe
      data-testid="video"
      title={videoSource}
      width="853"
      height="480"
      src={videoSource}
      frameborder="0"
      allowfullscreen
    ></iframe>
  );
};

ProjectShowcaseVideo.propTypes = {
  videoSource: PropTypes.string,
};

export default ProjectShowcaseVideo;
