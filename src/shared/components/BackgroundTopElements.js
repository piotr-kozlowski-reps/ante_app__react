import React, { Fragment, useRef, useEffect } from "react";

import { backgroundRevealDown } from "../utils/animations";

const BackgroundTopElements = () => {
  ////refs
  let grayBackground = useRef(null);
  let darkGrayBackground = useRef(null);
  let whiteBackground = useRef(null);

  ////logic
  useEffect(() => {
    backgroundRevealDown(
      0.7,
      darkGrayBackground,
      whiteBackground,
      grayBackground
    );
  }, []);

  ////jsx
  return (
    <Fragment>
      <div
        ref={(el) => (darkGrayBackground = el)}
        id="my-bg-dark-gray"
        data-testid="div-animate-element"
      ></div>
      <div
        ref={(el) => (whiteBackground = el)}
        id="my-bg-white"
        data-testid="div-animate-element"
      ></div>
      <div
        ref={(el) => (grayBackground = el)}
        id="my-bg-gray"
        data-testid="div-animate-element"
      ></div>
    </Fragment>
  );
};

export default BackgroundTopElements;
