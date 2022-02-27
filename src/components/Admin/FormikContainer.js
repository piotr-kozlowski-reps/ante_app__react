import React, { Fragment, useState } from "react";
import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import genre from "../../shared/utils/genre";
import {
  generateInitialValues,
  generateValidation,
} from "../../shared/utils/generateFormDataFactory";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";

import AdminFormStage from "./AdminFormStage";
import AdminGenreChooser from "./AdminGenreChooser";
import AdminFormFooter from "./AdminFormFooter";
import FormikCommonData from "./FormikCommonData";
import FormikProjectAttachmentsMainIcon from "./FormikProjectAttachmentsMainIcon";
import Separator from "../../shared/components/Separator";
import FormikAnimationAttachments from "./FormikAnimationAttachments";
import FormikAppAttachments from "./FormikAppAttachments";
import FormikGraphicAttachments from "./FormikGraphicAttachments";
import FormikPanoramaAttachments from "./FormikPanoramaAttachments";
import ErrorModal from "../../shared/components/ErrorModal";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import Button from "../../shared/components/Button";
import Modal from "../../shared/components/Modal";

function FormikContainer() {
  ////vars
  const formStageCounter = useSelector((state) => state.form.formStageCounter);
  const genreOfProject = useSelector((state) => state.form.genreOfProject);
  const initialValues = generateInitialValues(genreOfProject);
  const validationSchema = generateValidation(genreOfProject);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  ////func
  const onSubmit = async (values, onSubmitProps) => {
    try {
      await sendRequest(
        "http://localhost:5000/api/projects",
        "POST",
        JSON.stringify(values),
        { "Content-Type": "application/json" }
      );

      setShowConfirmModal(true);

      const timer = () => {
        setTimeout(() => {
          setShowConfirmModal(false);
        }, 1600);
      };
      timer();

      clearTimeout(timer);
    } catch (error) {}

    const timer = () => {
      setTimeout(() => {
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
        navigate("../../api/projects");
      }, 1750);
    };
    timer();
    clearTimeout(timer);
  };

  ////jsx
  return (
    <Fragment>
      <Modal
        header="Information"
        headerClass="modal-header-mine__show-header-login"
        show={showConfirmModal}
        // onCancel={hideLoginModal}
      >
        <Separator additionalClass="py-bottom2_5" />
        <div className="center">
          <p>Project sent and created.</p>
        </div>
      </Modal>
      <ErrorModal
        error={error}
        onClear={clearError}
        headerClass="modal-header-mine__show-header-login"
      />
      {isLoading && <LoadingSpinner asOverlay />}
      <AdminFormStage />
      {/* stage0 */}
      {formStageCounter === 0 && <AdminGenreChooser />}
      {genreOfProject && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount={true}
        >
          {(formik) => {
            const { errors } = formik;

            //
            let isNextActive = true;
            if (
              errors.projNamePl ||
              errors.projNameEn ||
              errors.cityPl ||
              errors.cityEn ||
              errors.countryPL ||
              errors.countryEn ||
              errors.clientPl ||
              errors.clientEn ||
              errors.completionDate ||
              errors.projectType
            )
              isNextActive = false;

            ////jsx
            return (
              <Form className="form">
                {/* stage1 */}
                {formStageCounter === 1 && <FormikCommonData {...formik} />}

                {/* stage2 */}
                {formStageCounter === 2 && (
                  <div>
                    <div id="portfolio" className="container">
                      <FormikProjectAttachmentsMainIcon {...formik} />
                      <Separator />
                      {genreOfProject === genre.ANIMATION && (
                        <FormikAnimationAttachments {...formik} />
                      )}

                      {genreOfProject === genre.APP && (
                        <FormikAppAttachments {...formik} />
                      )}

                      {genreOfProject === genre.GRAPHIC && (
                        <FormikGraphicAttachments {...formik} />
                      )}

                      {genreOfProject === genre.PANORAMA && (
                        <FormikPanoramaAttachments {...formik} />
                      )}
                    </div>
                  </div>
                )}
                <AdminFormFooter
                  isOnlyCancel={false}
                  isNextActive={isNextActive}
                  isSubmitActive={!formik.isValid || formik.isSubmitting}
                />
              </Form>
            );
          }}
        </Formik>
      )}
      {formStageCounter === 0 && !genreOfProject && (
        <AdminFormFooter isOnlyCancel={true} />
      )}
    </Fragment>
  );
}

export default FormikContainer;
