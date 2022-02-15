import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const About = () => {
  ////vars
  const lang = useSelector((state) => state.language.lang);

  ////jsx
  return (
    <Fragment>
      <div id="about" className="container" data-testid="about-page">
        <div className="row">
          <div className="col-lg-12">
            <div>{`About, language: ${lang}`}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default About;

//TODO: make about page
