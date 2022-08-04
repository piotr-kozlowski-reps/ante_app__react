import React from "react";
import PropTypes from "prop-types";
import ReactPannellum, { getConfig } from "react-pannellum";
import { v4 as uuidv4 } from "uuid";

const PanoramaFullView = ({ panoramaImageSource, panoramaTitle }) => {
  ////vars
  const config = {
    autoRotate: -1,
    autoRotateInactivityDelay: 2000,
    autoLoad: false,
    author: "ANTE",
  };

  ////jsx
  return (
    <ReactPannellum
      id={panoramaTitle + uuidv4()}
      sceneId={panoramaTitle}
      imageSource={panoramaImageSource}
      style={{
        maxWidth: "1500px",
        height: "500px",
        marginTop: "30px",
        // margin: 0,
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
