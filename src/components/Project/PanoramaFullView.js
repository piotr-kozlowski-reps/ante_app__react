import React from "react";
import PropTypes from "prop-types";
import ReactPannellum, { getConfig } from "react-pannellum";

const PanoramaFullView = ({ panoramaImageSource, panoramaTitle }) => {
  ////vars
  const config = {
    autoRotate: -2,
    autoLoad: true,
  };

  ////jsx
  return (
    <ReactPannellum
      id={panoramaTitle}
      sceneId={panoramaTitle}
      imageSource={`${process.env.REACT_APP_BACKEND_URL}${panoramaImageSource}`}
      author="ANTE"
      style={{
        maxWidth: "1500px",
        height: "500px",
        padding: "0px",
        margin: 0,
      }}
      uiText={{
        loadButtonLabel: "Click to<br>Load<br>Panorama",
        loadingLabel: "Loading...",
        bylineLabel: "by ANTE",
        noPanoramaError: "No panorama image was specified.",
        fileAccessError: "The file %s could not be accessed.",
        malformedURLError: "There is something wrong with the panorama URL.",
        iOS8WebGLError:
          "Due to iOS 8's broken WebGL implementation, only progressive encoded JPEGs work for your device (this panorama uses standard encoding).",
        genericWebGLError:
          "Your browser does not have the necessary WebGL support to display this panorama.",
        textureSizeError:
          "This panorama is too big for your device! It's %spx wide, but your device only supports images up to %spx wide. Try another device. (If you're the author, try scaling down the image.)",
        unknownError: "Unknown error. Check developer console.",
      }}
      config={config}
    />
  );
};

PanoramaFullView.propTypes = {
  panoramaImageSource: PropTypes.string,
  panoramaTitle: PropTypes.string,
};
export default PanoramaFullView;
