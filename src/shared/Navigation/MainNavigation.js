import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { languageActions } from "../store/language-slice";
import { useNavigate, Link, NavLink, useLocation } from "react-router-dom";
import {
  fadeInUp,
  fadeFromRight,
  fadeFromRightPlusScale,
  fadeOutToLeft,
} from "../utils/animations";

import Button from "../components/Button";

import logoImg from "../../images/ante-logo.png";

const MainNavigation = () => {
  //
  //vars
  const lang = useSelector((state) => state.language.lang);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [initialRender, setInitialRender] = useState(true);
  const [locationPrefix, setLocationPrefix] = useState(
    location.pathname.slice(1, 3)
  );
  //refs
  let logo = useRef(null);
  let projectsLink = useRef(null);
  let aboutLink = useRef(null);
  let contactLink = useRef(null);
  let loginLink = useRef(null);
  let logoutLink = useRef(null);
  let languageLink = useRef(null);

  //
  //logic

  //initialAnimation
  // useEffect(() => {
  //   fadeFromRight(
  //     0.6,
  //     0.2,
  //     40,
  //     0.3,
  //     projectsLink,
  //     aboutLink,
  //     contactLink,
  //     loginLink,
  //     logoutLink
  //   );
  //   fadeInUp(0.4, 0.6, 20, 0.1, logo);
  //   fadeFromRightPlusScale(0.8, 0.5, 20, 1.2, 0.3, languageLink);
  // }, []);

  //animation of links when location changed
  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    }
    if (!initialRender) {
      // fadeOutToLeft(
      //   0.3,
      //   0,
      //   -90,
      //   0,
      //   projectsLink,
      //   aboutLink,
      //   contactLink,
      //   loginLink,
      //   logoutLink
      // );
      // fadeFromRight(
      //   0.4,
      //   0,
      //   40,
      //   0.3,
      //   projectsLink,
      //   aboutLink,
      //   contactLink,
      //   loginLink,
      //   logoutLink
      // );

      //animation of language button when really language changed
      if (locationPrefix === "pl" && lang === "en") {
        setLocationPrefix("en");
        // fadeFromRightPlusScale(0.4, 0, 20, 1.2, 0.3, languageLink);
      }
      if (locationPrefix === "en" && lang === "pl") {
        setLocationPrefix("pl");
        // fadeFromRightPlusScale(0.4, 0, 20, 1.2, 0.3, languageLink);
      }
    }
  }, [location.pathname, initialRender]);

  //toggle language button
  const languageButtonContent = lang === "pl" ? "EN" : "PL";
  const toggleLanguageHandler = () => {
    if (lang === "pl") {
      dispatch(languageActions.setLanguageToEN());
      const currentPath = location.pathname;
      const desiredPathName = currentPath.replace("pl", "en");
      navigate(desiredPathName);
    } else {
      dispatch(languageActions.setLanguageToPL());
      const currentPath = location.pathname;
      const desiredPathName = currentPath.replace("en", "pl");
      navigate(desiredPathName);
    }
  };

  //checking if someone pasted URL directly -> setting language accordingly
  useEffect(() => {
    if (location.pathname.startsWith("/pl") && lang === "en")
      dispatch(languageActions.setLanguageToPL());
    if (location.pathname.startsWith("/en") && lang === "pl")
      dispatch(languageActions.setLanguageToEN());
  }, [dispatch, lang, location.pathname]);

  //
  //jsx
  return (
    <Fragment>
      <div className="row menu-top">
        <div className="col-xs-2">
          <div className="lang" ref={(el) => (languageLink = el)}>
            <Button onClick={toggleLanguageHandler}>
              {languageButtonContent}
            </Button>
          </div>
        </div>
        <div className="col-xs-10">
          <ul className="nav top-nav">
            <li>
              {/* TODO: logout to handle */}
              <NavLink
                ref={(el) => (logoutLink = el)}
                to={`../../login`}
                className={({ isActive }) =>
                  "main-nav-link" + (isActive ? " main-nav-link-active" : "")
                }
                style={{ display: "none" }}
              >
                Logout
              </NavLink>
            </li>

            <li>
              {/* TODO: Login to handle */}
              <NavLink
                ref={(el) => (loginLink = el)}
                to={`../../login`}
                className={({ isActive }) =>
                  "main-nav-link" + (isActive ? " main-nav-link-active" : "")
                }
              >
                Login
              </NavLink>
            </li>

            <li>
              <NavLink
                ref={(el) => (contactLink = el)}
                to={`../../${lang}/contact`}
                className={({ isActive }) =>
                  "main-nav-link" + (isActive ? " main-nav-link-active" : "")
                }
              >
                {lang === "pl" ? "Kontakt" : "Contact"}
              </NavLink>
            </li>

            <li>
              <NavLink
                ref={(el) => (aboutLink = el)}
                to={`../../${lang}/about`}
                className={({ isActive }) =>
                  "main-nav-link" + (isActive ? " main-nav-link-active" : "")
                }
              >
                {lang === "pl" ? "O nas" : "About"}
              </NavLink>
            </li>

            <li>
              <NavLink
                ref={(el) => (projectsLink = el)}
                to={`../../${lang}/projects`}
                className={({ isActive }) =>
                  "main-nav-link" + (isActive ? " main-nav-link-active" : "")
                }
              >
                {lang === "pl" ? "Projekty" : "Projects"}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="row">
        <div className="logo-top text-center" ref={(el) => (logo = el)}>
          <Link to={`../../${lang}/projects`}>
            <img src={logoImg} alt="Ante logo" />
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default MainNavigation;
