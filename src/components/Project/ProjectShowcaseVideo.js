import React from "react";
import PropTypes from "prop-types";

const ProjectShowcaseVideo = ({ videoSource }) => {
  ////jsx
  return (
    <div className="video-responsive">
      <iframe
        data-testid="video"
        title={videoSource}
        // width="100%"
        // height="100%"
        width="853"
        height="480"
        src={videoSource}
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  );
};

ProjectShowcaseVideo.propTypes = {
  videoSource: PropTypes.string,
};

export default ProjectShowcaseVideo;
