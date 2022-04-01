import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useSelector, useDispatch } from "react-redux";
import { formActions } from "../shared/store/form-slice";
import { Formik, Form } from "formik";
import genre from "../shared/utils/genre";
import { generateValidation } from "../shared/utils/generateFormDataFactory";

import ErrorModal from "../shared/components/ErrorModal";
import LoadingSpinner from "../shared/components/LoadingSpinner";
import AdminFormStage from "../components/Admin/AdminFormStage";
import AdminTitle from "../components/Admin/AdminTitle";
import AdminFormFooter from "../components/Admin/AdminFormFooter";
import FormikCommonData from "../components/Admin/FormikCommonData";
import FormikProjectAttachmentsMainIcon from "../components/Admin/FormikProjectAttachmentsMainIcon";
import FormikAnimationAttachments from "../components/Admin/FormikAnimationAttachments";
import FormikAppAttachments from "../components/Admin/FormikAppAttachments";
import FormikGraphicAttachments from "../components/Admin/FormikGraphicAttachments";
import FormikPanoramaAttachments from "../components/Admin/FormikPanoramaAttachments";
import Separator from "../shared/components/Separator";
import Modal from "../shared/components/Modal";

//temporary
// import { DUMMY_PROJECT_GRAPHIC } from "../shared/utils/data-models";
// const DUMMY_ARRAY = [DUMMY_PROJECT_GRAPHIC];

const UpdateProject = () => {
  ////vars
  const projectId = useParams().projectId;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fetchingEnded, setFetchingEnded] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const formStageCounter = useSelector((state) => state.form.formStageCounter);
  const token = useSelector((state) => state.auth.token);

  const [project, setProject] = useState({});
  const [genreOfProject, setGenreOfProject] = useState(null);
  const [validationSchema, setValidationSchema] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectFetched = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/projects/${projectId}`
        );

        const initialProject = { ...projectFetched.project };
        initialProject.completionDate = new Date(
          projectFetched.project.completionDate
        );

        setProject(initialProject);
        setFetchingEnded(true);
        dispatch(formActions.setDesiredStage(1));
        setValidationSchema(generateValidation(project.genre));
      } catch (error) {
        console.log(error);
      }
    };
    fetchProject();
  }, [sendRequest, projectId, dispatch, project.genre]);

  console.log({ project });

  useEffect(() => {
    if (Object.keys(project).length > 0) setGenreOfProject(project.genre);
  }, [project]);

  // const isProjectFound =
  //   !isLoading && fetchingEnded && project && Object.keys(project).length > 0;

  ////func
  const clearAndRedirectWhenNoProjectHandler = () => {
    clearError();
    navigate(-1);
  };

  const onSubmit = async (values, onSubmitProps) => {
    try {
      const formData = new FormData();
      buildFormData(formData, values, null);

      //logs
      console.log({ values });
      console.log("formData: ", [...formData]);

      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/projects/${projectId}`,
        "PATCH",
        formData,
        { Authorization: `Bearer ${token}` }
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
        onSubmitProps.setStatus({ success: true });
        onSubmitProps.resetForm({});
        dispatch(formActions.resetGenreOfProjectToNull());
        navigate("../../api/projects");
      }, 1750);
    };
    timer();
    clearTimeout(timer);
    console.log("submit");
  };

  function buildFormData(formData, data, parentKey) {
    if (
      data &&
      typeof data === "object" &&
      !(data instanceof Date) &&
      !(data instanceof File) &&
      !(data instanceof Blob)
    ) {
      Object.keys(data).forEach((key) => {
        buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key
        );
      });
    } else {
      const value = data == null ? "" : data;

      formData.append(parentKey, value);
    }
  }

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
          <p>Project updated.</p>
        </div>
      </Modal>
      <ErrorModal
        error={error}
        onClear={clearAndRedirectWhenNoProjectHandler}
        headerClass="modal-header-mine__show-header-login"
      />
      {isLoading && <LoadingSpinner asOverlay />}
      <AdminTitle title="Update project" />
      <AdminFormStage />
      {genreOfProject && (
        <Formik
          initialValues={project}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount={true}
        >
          {(formik) => {
            const { errors } = formik;
            console.log(formik);

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
    </Fragment>
  );
};

export default UpdateProject;
