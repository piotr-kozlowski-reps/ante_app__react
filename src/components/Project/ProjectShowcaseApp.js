import React from "react";
import PropTypes from "prop-types";

//images
import buttonAndroid from "../../images/buttons_01-min.png";
import buttonIOS from "../../images/buttons_02-min.png";

const ProjectShowcaseApp = ({
  lang,
  appName,
  appImage,
  appDescription,
  appAndroidLink,
  appIOSLink,
}) => {
  ////jsx
  return (
    <div className="row">
      <div className="col-lg-6 equal-height">
        <div>
          <img
            style={{ margin: "0px auto" }}
            src={appImage}
            alt={appName}
          ></img>
        </div>
      </div>

      <div className="col-lg-4 equal-height">
        <div style={{ marginTop: "25%" }}>
          <h2>
            {appName}
            <br />
            {lang === "pl" ? "Aplikacja AR" : "AR APP"}
          </h2>
          <p className="hero-heading">
            {appDescription}
            <br />
            <br />
            <strong>
              {lang === "pl" ? "Pobierz aplikację:" : "Download application:"}
            </strong>
          </p>
          <div className="row">
            <div className="col-lg-6">
              <a href={appAndroidLink} data-testid="app-android-link">
                <img src={buttonAndroid} alt="Android"></img>
              </a>
            </div>

            <div className="col-lg-6">
              <a href={appIOSLink} data-testid="app-ios-link">
                <img src={buttonIOS} alt="IOS"></img>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectShowcaseApp.propTypes = {
  lang: PropTypes.oneOf(["pl", "en"]),
  appName: PropTypes.string,
  appImage: PropTypes.string,
  appDescription: PropTypes.string,
  appAndroidLink: PropTypes.string,
  appIOSLink: PropTypes.string,
};

export default ProjectShowcaseApp;
