import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { languageActions } from "../store/language-slice";
import { useNavigate, Link, NavLink, useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
  fadeInUp,
  fadeFromRight,
  fadeFromRightPlusScale,
  fadeOutToLeft,
} from "../utils/animations";
import { VALIDATOR_EMAIL, VALIDATOR_PASSWORD } from "../utils/validators";
// import { useForm } from "../hooks/form-hook"; //TODO: form-hook

import Button from "../components/Button";
import Modal from "../components/Modal";
import Separator from "../components/Separator";
import FormikControl from "../../components/Admin/FormikControl";
import Input from "../components/Input";

import logoImg from "../../images/ante-logo.png";
import { authActions } from "../store/auth-slice";

////vars before
// const initialInputs = { //TODO: form-hook
//   login: {
//     value: "",
//     isValid: false,
//   },
//   password: {
//     value: "",
//     isValid: false,
//   },
// };

const MainNavigation = () => {
  ////vars
  const lang = useSelector((state) => state.language.lang);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [initialRender, setInitialRender] = useState(true);
  const [locationPrefix, setLocationPrefix] = useState(
    location.pathname.slice(1, 3)
  );
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);

  //refs
  let logo = useRef(null);
  let projectsLink = useRef(null);
  let aboutLink = useRef(null);
  let contactLink = useRef(null);
  let loginLink = useRef(null);
  let logoutLink = useRef(null);
  let languageLink = useRef(null);

  ////logic
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

  //login modal
  const showLoginModal = () => {
    setIsShowLoginModal(true);
  };
  const hideLoginModal = () => {
    setIsShowLoginModal(false);
  };
  const loginHandler = (event) => {
    event.preventDefault();
    // console.log(formState.inputs); //TODO: form-hook
    dispatch(authActions.login());
    setIsShowLoginModal(false);
  };
  const logoutHandler = () => {
    console.log("logout");
    dispatch(authActions.logout());
  };
  //login modal form
  const initialValues = {
    login: "",
    password: "",
  };
  const validationSchema = Yup.object({
    login: Yup.string().required("Login is required."),
    password: Yup.string().required("Login is required."), //TODO: custom validation of password
  });

  //
  //jsx
  return (
    <Fragment>
      <Modal
        header="Login"
        headerClass="modal-header-mine__show-header-login"
        footer={
          <div className="center">
            <Button onClick={hideLoginModal}>CANCEL</Button>
            {/* <Button onClick={loginHandler} disabled={!formState.isValid}>//TODO: form-hook */}
            <Button onClick={loginHandler} disabled={true}>
              LOGIN
            </Button>
          </div>
        }
        show={isShowLoginModal}
        onCancel={hideLoginModal}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={loginHandler}
          validateOnMount={true}
        >
          {(formik) => {
            console.log(formik);
            const { errors } = formik;

            ////jsx
            return (
              <Form className="form">
                <div id="login">
                  <Separator additionalClass="py-bottom2_5" />

                  <div className="project-details center">
                    <FormikControl
                      control="input"
                      type="text"
                      label="Login"
                      name="login"
                      placeholder="enter your login"
                      additionalClass="py-bottom2_5"
                    />
                  </div>

                  <div className="project-details center">
                    <FormikControl
                      control="input"
                      type="text"
                      label="Password"
                      name="password"
                      placeholder="enter your password"
                      additionalClass="py-bottom2_5"
                    />
                  </div>
                </div>

                {/* <AdminFormFooter
                  isOnlyCancel={false}
                  isNextActive={isNextActive}
                  isSubmitActive={!formik.isValid || formik.isSubmitting}
                /> */}
              </Form>
            );
          }}
        </Formik>
      </Modal>

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
            {isLoggedIn && (
              <li>
                <NavLink
                  ref={(el) => (logoutLink = el)}
                  to={`./`}
                  className={({ isActive }) =>
                    "main-nav-link" + (isActive ? " main-nav-link-active" : "")
                  }
                  onClick={logoutHandler}
                >
                  Logout
                </NavLink>
              </li>
            )}

            {isLoggedIn && (
              <li>
                <NavLink
                  ref={(el) => (logoutLink = el)}
                  to={`../../api/projects`}
                  className={({ isActive }) =>
                    "main-nav-link" + (isActive ? " main-nav-link-active" : "")
                  }
                >
                  Admin
                </NavLink>
              </li>
            )}

            {!isLoggedIn && (
              <li>
                <NavLink
                  ref={(el) => (loginLink = el)}
                  to={`./`}
                  className={({ isActive }) =>
                    "main-nav-link" + (isActive ? " main-nav-link-active" : "")
                  }
                  onClick={showLoginModal}
                >
                  Login
                </NavLink>
              </li>
            )}

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
