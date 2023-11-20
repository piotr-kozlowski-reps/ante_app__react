import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import Separator from "./Separator";
import FormikControl from "../../components/Admin/FormikControl";
import { useHttpClient } from "../hooks/http-hook";
import { authActions } from "../store/auth-slice";
import Button from "./Button";

export default function LoginForm(props) {
  ////vars
  const dispatch = useDispatch();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { hideLoginModal } = props;

  const tokenExpirationDateState = useSelector(
    (state) => state.auth.tokenExpirationDate
  );

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

    hideLoginModal();
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };

  ////jsx
  return (
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
  );
}
