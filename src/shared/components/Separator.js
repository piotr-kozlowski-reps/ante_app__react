import React from "react";
import PropTypes from "prop-types";

const Separator = (props) => {
  ////jsx
  return (
    <div
      className={
        props.additionalClass
          ? `div-center-no-py ${props.additionalClass}`
          : "div-center-no-py"
      }
    >
      <div className="separator"></div>
    </div>
  );
};

Separator.propTypes = {
  additionalClass: PropTypes.string,
};

export default Separator;
