import React from "react";
import ReactDOM from "react-dom";

import "./LoadingSpinner.css";

const LoadingSpinner = (props) => {
  return ReactDOM.createPortal(
    <div className={`${props.asOverlay && "loading-spinner__overlay"}`}>
      <div className="lds-dual-ring"></div>
    </div>,
    document.getElementById("loading-hook")
  );
};

export default LoadingSpinner;
