import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { languageActions } from "../store/language-slice";
import { useNavigate, Link, NavLink, useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import { authActions } from "../store/auth-slice";
import * as Yup from "yup";
import { useHttpClient } from "../hooks/http-hook";
import { motion } from "framer-motion";

import Button from "../components/Button";
import Modal from "../components/Modal";
import Separator from "../components/Separator";
import FormikControl from "../../components/Admin/FormikControl";
import ErrorModal from "../components/ErrorModal";
import LoadingSpinner from "../components/LoadingSpinner";

import logoImg from "../../images/ante-logo.png";
import {
  linksHoverVariants,
  logoHoverVariants,
} from "../utils/framerMotionAnimationsVariants";

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
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
  ////TESTED
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
        `${process.env.REACT_APP_BACKEND_URL}api/login`,
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
        new Date(new Date().getTime() + 1000 * 60 * 60 * 8);

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
          <div className="lang">
            <Button onClick={toggleLanguageHandler}>
              {languageButtonContent}
            </Button>
          </div>
        </div>
        <div className="col-xs-10">
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
