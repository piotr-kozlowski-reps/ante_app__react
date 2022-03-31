import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { languageActions } from "../store/language-slice";
import { useNavigate, Link, NavLink, useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import { authActions } from "../store/auth-slice";
import * as Yup from "yup";
import { useHttpClient } from "../hooks/http-hook";

import {
  fadeInUp,
  fadeFromRight,
  fadeFromRightPlusScale,
  fadeOutToLeft,
} from "../utils/animations";
import { VALIDATOR_EMAIL, VALIDATOR_PASSWORD } from "../utils/validators";

import Button from "../components/Button";
import Modal from "../components/Modal";
import Separator from "../components/Separator";
import FormikControl from "../../components/Admin/FormikControl";
import ErrorModal from "../components/ErrorModal";
import LoadingSpinner from "../components/LoadingSpinner";

import logoImg from "../../images/ante-logo.png";

const MainNavigation = () => {
  ////vars
  const lang = useSelector((state) => state.language.lang);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const tokenExpirationDateState = useSelector(
    (state) => state.auth.tokenExpirationDate
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [initialRender, setInitialRender] = useState(true);
  const [locationPrefix, setLocationPrefix] = useState(
    location.pathname.slice(1, 3)
  );
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
  const loginHandler = async (values, onSubmitProps) => {
    //fetch
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/login",
        "POST",
        JSON.stringify({
          login: values.login,
          password: values.password,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      //localStorageData
      const tokenExpirationDate =
        tokenExpirationDateState ||
        new Date(new Date().getTime() + 1000 * 60 * 60);

      localStorage.setItem(
        "userData",
        JSON.stringify({
          login: responseData.login,
          token: responseData.token,
          expiration: tokenExpirationDate.toISOString(),
        })
      );

      dispatch(
        authActions.login({
          userId: responseData.id,
          login: responseData.login,
          token: responseData.token,
          expirationDate: tokenExpirationDate.toISOString(),
        })
      );
    } catch (error) {}

    setIsShowLoginModal(false);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
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
    password: Yup.mixed()
      .test({
        name: "required",
        message: "Password is required.",
        test: (value) => {
          if (!value) return false;
          if (value.trim().length < 1) return false;
          return true;
        },
      })
      .test({
        name: "minDIgits",
        message: "Password must have at least 2 digits.",
        test: (value) => {
          if (!value) return false;
          let numberOfOccurrence = 0;
          [...value].forEach((letter) => {
            if (letter.match(/\d/)) numberOfOccurrence++;
          });
          return numberOfOccurrence >= 2;
        },
      })
      .test({
        name: "minCapitalLetters",
        message: "Password must have at least 2 capital letters.",
        test: (value) => {
          if (!value) return false;
          let numberOfOccurrence = 0;
          [...value].forEach((letter) => {
            if (letter.match(/[A-Z]/)) numberOfOccurrence++;
          });
          return numberOfOccurrence >= 2;
        },
      })
      .test({
        name: "minSmallLetters",
        message: "Password must have at least 2 small letters.",
        test: (value) => {
          if (!value) return false;
          let numberOfOccurrence = 0;
          [...value].forEach((letter) => {
            if (letter.match(/[a-z]/)) numberOfOccurrence++;
          });
          return numberOfOccurrence >= 2;
        },
      })
      .test({
        name: "minSpecialCharacters",
        message: "Password must have at least 2 special characters.",
        test: (value) => {
          if (!value) return false;
          let numberOfOccurrence = 0;
          [...value].forEach((letter) => {
            if (letter.match(/[^A-Za-z 0-9]/)) numberOfOccurrence++;
          });
          return numberOfOccurrence >= 2;
        },
      }),
  });

  ////jsx
  return (
    <Fragment>
      <ErrorModal
        error={error}
        onClear={clearError}
        headerClass="modal-header-mine__show-header-login"
      />
      {isLoading && <LoadingSpinner asOverlay />}
      <Modal
        header="Login"
        headerClass="modal-header-mine__show-header-login"
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

                <div className="center">
                  <Button onClick={hideLoginModal}>CANCEL</Button>
                  <Button
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    LOGIN
                  </Button>
                </div>
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
