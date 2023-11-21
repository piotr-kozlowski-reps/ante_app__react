import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { languageActions } from "../store/language-slice";
import { useNavigate, Link, NavLink, useLocation } from "react-router-dom";
import { authActions } from "../store/auth-slice";

import { useHttpClient } from "../hooks/http-hook";
import { motion } from "framer-motion";
import Button from "../components/Button";
import Modal from "../components/Modal";
import ErrorModal from "../components/ErrorModal";
import LoadingSpinner from "../components/LoadingSpinner";
import logoImg from "../../images/ante-logo.png";
import {
  linksHoverVariants,
  logoHoverVariants,
} from "../utils/framerMotionAnimationsVariants";
import LoginForm from "../components/LoginForm";
import { useLoginModal } from "../hooks/useLoginModal";
import MobileNavigation from "./MobileNavigation";

const MainNavigation = () => {
  ////vars
  const lang = useSelector((state) => state.language.lang);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  let hamburgerRef = useRef(null);
  const tokenExpirationDateState = useSelector(
    (state) => state.auth.tokenExpirationDate
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { hideLoginModal, showLoginModal, isShowLoginModal, logoutHandler } =
    useLoginModal();

  const [hamburgerClicked, setHamburgerClicked] = useState(false);
  const hamburgerToggleHandler = () => {
    setHamburgerClicked(
      (hamburgerClicked) => (hamburgerClicked = !hamburgerClicked)
    );
  };

  //toggle language button
  ////TESTED
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

  //login modal

  ////jsx
  return (
    <Fragment>
      <ErrorModal
        error={error}
        onClear={clearError}
        headerClass="modal-header-mine__show-header-login"
      />
      {isLoading ? <LoadingSpinner asOverlay /> : null}
      <div className="col-lg-12 hamburger-z-index">
        <div className="navbar-header navbar-hamburger">
          <div className="menu-wrap">
            <input
              ref={hamburgerRef}
              type="checkbox"
              className="toggler"
              onClick={hamburgerToggleHandler}
            ></input>
            <div className="hamburger hamburger-details ">
              <div></div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      {hamburgerClicked ? (
        <MobileNavigation
          // logoutHandler={logoutHandler}
          setHamburgerClicked={setHamburgerClicked}
          // hamburgerToggleHandler={hamburgerToggleHandler}
          hamburgerRef={hamburgerRef}
        />
      ) : null}

      <Modal
        header="Login"
        headerClass="modal-header-mine__show-header-login"
        show={isShowLoginModal}
        onCancel={hideLoginModal}
      >
        <LoginForm hideLoginModal={hideLoginModal} />
      </Modal>

      <div className="row menu-top">
        <div className="col-xs-2">
          <div className="lang">
            <Button onClick={toggleLanguageHandler}>
              {languageButtonContent}
            </Button>
          </div>
        </div>
        {/* mainNavStart */}
        <div className="col-xs-10 menu-main-links">
          <ul className="nav top-nav">
            {isLoggedIn && (
              <motion.li
                variants={linksHoverVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <NavLink
                  to={`./`}
                  className={({ isActive }) =>
                    "main-nav-link" + (isActive ? " main-nav-link-active" : "")
                  }
                  onClick={logoutHandler}
                >
                  Logout
                </NavLink>
              </motion.li>
            )}

            {isLoggedIn && (
              <motion.li
                variants={linksHoverVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <NavLink
                  to={`../../api/projects`}
                  className={({ isActive }) =>
                    "main-nav-link" + (isActive ? " main-nav-link-active" : "")
                  }
                >
                  Admin
                </NavLink>
              </motion.li>
            )}

            {!isLoggedIn && (
              <motion.li
                variants={linksHoverVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <NavLink
                  data-testid="login-main-navigation"
                  to={`./`}
                  className={({ isActive }) =>
                    "main-nav-link" + (isActive ? " main-nav-link-active" : "")
                  }
                  onClick={showLoginModal}
                >
                  Login
                </NavLink>
              </motion.li>
            )}

            <motion.li
              variants={linksHoverVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <NavLink
                to={`../../${lang}/contact`}
                className={({ isActive }) =>
                  "main-nav-link" + (isActive ? " main-nav-link-active" : "")
                }
              >
                {lang === "pl" ? "Kontakt" : "Contact"}
              </NavLink>
            </motion.li>

            <motion.li
              variants={linksHoverVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <NavLink
                to={`../../${lang}/about`}
                className={({ isActive }) =>
                  "main-nav-link" + (isActive ? " main-nav-link-active" : "")
                }
              >
                {lang === "pl" ? "O nas" : "About"}
              </NavLink>
            </motion.li>

            <motion.li
              variants={linksHoverVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <NavLink
                to={`../../${lang}/projects`}
                className={({ isActive }) =>
                  "main-nav-link" + (isActive ? " main-nav-link-active" : "")
                }
              >
                {lang === "pl" ? "Projekty" : "Projects"}
              </NavLink>
            </motion.li>
          </ul>
        </div>
        {/* mainNavEnd */}
      </div>

      <div className="row">
        <div className="logo-top text-center">
          <Link to={`../../${lang}/projects`}>
            <motion.img
              src={logoImg}
              alt="Ante logo top"
              variants={logoHoverVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            />
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default MainNavigation;
