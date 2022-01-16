import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div className="backdrop-mine" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook")
  );
};

Backdrop.propTypes = {
  onClick: PropTypes.func, // what happens when overlay clicked
};

export default Backdrop;
