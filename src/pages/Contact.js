import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { useHttpClient } from "../shared/hooks/http-hook";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import AdminTitle from "../components/Admin/AdminTitle";
import Modal from "../shared/components/Modal";
import ErrorModal from "../shared/components/ErrorModal";
import Separator from "../shared/components/Separator";
import LoadingSpinner from "../shared/components/LoadingSpinner";
import FormikControl from "../components/Admin/FormikControl";
import Button from "../shared/components/Button";

const Contact = () => {
  ////vars
  const lang = useSelector((state) => state.language.lang);
  const [modalInfoPl, setModalInfoPl] = useState("");
  const [modalInfoEn, setModalInfoEn] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //formik
  const initialValues = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    textContent: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Entering Name is required."),
    surname: Yup.string().required("Entering Surname is required."),
    email: Yup.string()
      .email("Enter valid e-mail, please.")
      .required("Entering e-mail is required."),
    phone: Yup.string(),
    textContent: Yup.string()
      .min(10)
      .required("Entering your contact message is required."),
  });

  const onSubmitHandler = async (values, onSubmitProps) => {
    // console.log(values);
    // fetch
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}api/contact`,
        "POST",
        JSON.stringify({
          lang: lang,
          name: values.name,
          surname: values.surname,
          email: values.email,
          phone: values.phone,
          textContent: values.textContent,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      if (responseData && responseData.messageEn && responseData.messagePl) {
        setModalInfoEn(responseData.messageEn);
        setModalInfoPl(responseData.messagePl);
        setShowConfirmModal(true);

        const timer = () => {
          setTimeout(() => {
            setShowConfirmModal(false);
          }, 1600);
        };
        timer();

        clearTimeout(timer);
      }
    } catch (error) {}

    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };

  ////jsx
  return (
    <Fragment>
      <div id="about" className="container" data-testid="contact-page">
        <Modal
          header="Information"
          headerClass="modal-header-mine__show-header-login"
          show={showConfirmModal}
        >
          <Separator additionalClass="py-bottom2_5" />
          <div className="center">
            <p>{lang === "pl" ? modalInfoPl : modalInfoEn}</p>
          </div>
        </Modal>
        <ErrorModal
          error={error}
          onClear={clearError}
          headerClass="modal-header-mine__show-header-login"
        />
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="row">
          <div className="col-lg-12">
            <AdminTitle title={lang === "pl" ? "Kontakt" : "Contact"} />
          </div>
        </div>
      </div>

      <div id="portfolio">
        <div className="row" id="parent">
          <div className="text-center">
            <div
              className="div-center-no-flex bigger-text"
              style={{ marginBottom: 0 }}
            >
              <p>
                {lang === "pl"
                  ? `Wype??nij formularz by si?? z nami skontaktowa??. 
                  Je??eli wolisz inn?? form?? kontaktu, w stopce strony znajduje si?? nasz adres e-mail oraz telefon.`
                  : `Feel free to contact us and we'll be glad to help.`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
        validateOnMount={true}
      >
        {(formik) => {
          // console.log({ formik });
          return (
            <Form className="form">
              <div id="portfolio" className="container">
                <div className="row" id="parent" style={{ marginTop: "6rem" }}>
                  <div className="form-row">
                    <div className="project-details">
                      <FormikControl
                        control="input"
                        type="text"
                        label={lang === "pl" ? "Imi??" : "Name"}
                        name="name"
                        placeholder={lang === "pl" ? "Twoje imi??" : "Your name"}
                      />
                    </div>

                    <div className="project-details">
                      <FormikControl
                        control="input"
                        type="text"
                        label={lang === "pl" ? "Nazwisko" : "Surname"}
                        name="surname"
                        placeholder={
                          lang === "pl" ? "Twoje nazwisko" : "Your surname"
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="row" id="parent">
                  <div className="form-row">
                    <div className="project-details">
                      <FormikControl
                        control="input"
                        type="text"
                        label="E-mail"
                        name="email"
                        placeholder={
                          lang === "pl" ? "Tw??j e-mail" : "Your e-mail"
                        }
                      />
                    </div>

                    <div className="project-details">
                      <FormikControl
                        control="input"
                        type="text"
                        label={
                          lang === "pl" ? "Numer telefonu" : "Phone number"
                        }
                        name="phone"
                        placeholder={
                          lang === "pl"
                            ? "Tw??j numer telefonu (nie wymagane)"
                            : "Your phone number (not required)"
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="row" id="parent">
                  <div className="form-row">
                    <div className="project-details">
                      <FormikControl
                        control="textarea"
                        type="text"
                        label={
                          lang === "pl" ? "Zapytanie" : "Your contact message"
                        }
                        name="textContent"
                        placeholder={
                          lang === "pl"
                            ? "Jak mo??emy pom??c?"
                            : "How can we help you?"
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="div-center-no-py">
                  <div className="separator"></div>
                </div>
                <div className="center" style={{ marginBottom: "3rem" }}>
                  <Button
                    type="button"
                    additionalClass="no-background"
                    onClick={formik.resetForm}
                  >
                    {lang === "pl" ? "WYCZY????" : "CLEAR"}
                  </Button>
                  <Button
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                    additionalClass="no-background"
                  >
                    {lang === "pl" ? "WY??LIJ" : "SEND"}
                  </Button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export default Contact;
