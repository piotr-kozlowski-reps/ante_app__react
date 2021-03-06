import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, NavLink } from "react-router-dom";
import { fadeFromRight, fadeInUp } from "../../shared/utils/animations";
import PropTypes from "prop-types";

const ProjectsTypeNavigation = (props) => {
  ////vars
  const lang = useSelector((state) => state.language.lang);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const queryTypeExtracted = params.get("type") ? params.get("type") : "all";
  const [hamburgerClicked, setHamburgerClicked] = useState(false);

  //refs
  let link1 = useRef(null);
  let link2 = useRef(null);
  let link3 = useRef(null);
  let link4 = useRef(null);
  let link5 = useRef(null);
  let link6 = useRef(null);
  let link7 = useRef(null);
  let link8 = useRef(null);
  let portfolioElement = useRef(null);

  const hamburgerToggleHandler = () => {
    setHamburgerClicked(
      (hamburgerClicked) => (hamburgerClicked = !hamburgerClicked)
    );
  };

  //
  //logic
  // initial animation effect
  // useLayoutEffect(() => {
  //   fadeFromRight(
  //     0.6,
  //     0.8,
  //     40,
  //     0.3,
  //     link1,
  //     link2,
  //     link3,
  //     link4,
  //     link5,
  //     link6,
  //     link7,
  //     link8
  //   );
  //   fadeInUp(0.4, 0.8, 20, 0.1, portfolioElement);
  // }, []);

  // link clicked animation effect
  // useEffect(() => {
  //   fadeFromRight(
  //     0.4,
  //     0,
  //     40,
  //     0.3,
  //     link1,
  //     link2,
  //     link3,
  //     link4,
  //     link5,
  //     link6,
  //     link7,
  //     link8
  //   );
  // }, [queryTypeExtracted, lang]);

  ////jsx
  return (
    <div
      id="the-sticky-div"
      className="container"
      ref={(el) => (portfolioElement = el)}
    >
      <div
        id="div-after-sticky-with-extra-py"
        className={`row ${
          props.additionalTitleClass ? props.additionalTitleClass : ""
        }`}
      >
        <div className="col-lg-12">
          <div className="navbar-header">
            <div className="menu-wrap">
              <input
                type="checkbox"
                className="toggler"
                onClick={hamburgerToggleHandler}
              ></input>
              <div class="hamburger">
                <div></div>
              </div>
            </div>
          </div>
          <h2>{props.title}</h2>
        </div>
      </div>
      <div className="row menu">
        <div className="col-lg-12">
          <div
            className={
              hamburgerClicked
                ? "navbar-collapse hamburger-visible"
                : "collapse navbar-collapse"
            }
            id="defaultNavbar1"
          >
            <ul className="nav navbar-nav">
              <li className="cat">
                <NavLink
                  ref={(el) => (link1 = el)}
                  to={`?type=all`}
                  className={
                    queryTypeExtracted === "all"
                      ? "main-nav-link  main-nav-link-active"
                      : "main-nav-link"
                  }
                >
                  {lang === "pl" ? "Wszystkie" : "all"}
                </NavLink>
              </li>

              <li className="cat">
                <NavLink
                  ref={(el) => (link2 = el)}
                  to={`?type=competitions`}
                  className={
                    queryTypeExtracted === "competitions"
                      ? "main-nav-link  main-nav-link-active"
                      : "main-nav-link"
                  }
                >
                  {lang === "pl" ? "Konkursy" : "competitions"}
                </NavLink>
              </li>

              <li className="cat">
                <NavLink
                  ref={(el) => (link3 = el)}
                  to={`?type=interiors`}
                  className={
                    queryTypeExtracted === "interiors"
                      ? "main-nav-link  main-nav-link-active"
                      : "main-nav-link"
                  }
                >
                  {lang === "pl" ? "Wn??trza" : "Interiors"}
                </NavLink>
              </li>

              <li className="cat">
                <NavLink
                  ref={(el) => (link4 = el)}
                  to={`?type=exteriors`}
                  className={
                    queryTypeExtracted === "exteriors"
                      ? "main-nav-link  main-nav-link-active"
                      : "main-nav-link"
                  }
                >
                  {lang === "pl" ? "Zewn??trza" : "Exteriors"}
                </NavLink>
              </li>

              <li className="cat">
                <NavLink
                  ref={(el) => (link5 = el)}
                  to={`?type=animations`}
                  className={
                    queryTypeExtracted === "animations"
                      ? "main-nav-link  main-nav-link-active"
                      : "main-nav-link"
                  }
                >
                  {lang === "pl" ? "Animacje" : "Animations"}
                </NavLink>
              </li>

              <li className="cat">
                <NavLink
                  ref={(el) => (link6 = el)}
                  to={`?type=3dmodeling`}
                  className={
                    queryTypeExtracted === "3dmodeling"
                      ? "main-nav-link  main-nav-link-active"
                      : "main-nav-link"
                  }
                >
                  {lang === "pl"
                    ? "Modelowanie produkt??w"
                    : "Products Modeling"}
                </NavLink>
              </li>

              <li className="cat">
                <NavLink
                  ref={(el) => (link7 = el)}
                  to={`?type=panoramas`}
                  className={
                    queryTypeExtracted === "panoramas"
                      ? "main-nav-link  main-nav-link-active"
                      : "main-nav-link"
                  }
                >
                  {lang === "pl" ? "Panoramy 360??" : "360?? Panoramas"}
                </NavLink>
              </li>

              <li className="cat">
                <NavLink
                  ref={(el) => (link8 = el)}
                  to={`?type=apps`}
                  className={
                    queryTypeExtracted === "apps"
                      ? "main-nav-link  main-nav-link-active"
                      : "main-nav-link"
                  }
                >
                  {lang === "pl" ? "AR apps" : "AR apps"}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectsTypeNavigation.propTypes = {
  title: PropTypes.string.isRequired,
  additionalTitleClass: PropTypes.string,
};

export default ProjectsTypeNavigation;

//TODO: check if sticky really works when more projects
//TODO: make hamburger menu
//TODO: check mobile css if everything works
