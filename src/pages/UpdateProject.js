import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useSelector, useDispatch } from "react-redux";
import { formActions } from "../shared/store/form-slice";
import { Formik, Form } from "formik";
import genre from "../shared/utils/genre";
import { generateValidation } from "../shared/utils/generateFormDataFactory";
import { changeDesiredFieldNameToAppropriateThumbnail } from "../shared/utils/general-utils";
import _ from "lodash";

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
import { type } from "@testing-library/user-event/dist/type";

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
  const [showSpinner, setShowSpinner] = useState(false);

  const [project, setProject] = useState({});
  const [genreOfProject, setGenreOfProject] = useState(null);
  const [validationSchema, setValidationSchema] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectFetched = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}api/projects/${projectId}`
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

  useEffect(() => {
    if (Object.keys(project).length > 0) setGenreOfProject(project.genre);
  }, [project]);

  ////func
  const clearAndRedirectWhenNoProjectHandler = () => {
    clearError();
    navigate(-1);
  };

  const onSubmit = async (values, onSubmitProps) => {
    try {
      setShowSpinner(true);
      const originalValues = { ...values };
      const finalDataToBeSent = _.cloneDeep(originalValues);

      //icoImgCloudinaryUpload If Needed
      const isIcoImgFullACloudinaryUrl = checkIfIsCloudinaryUrl(
        originalValues.icoImgFull
      );
      const isIcoImgThumbACloudinaryUrl = checkIfIsCloudinaryUrl(
        originalValues.icoImgThumb
      );

      if (!isIcoImgFullACloudinaryUrl || !isIcoImgThumbACloudinaryUrl) {
        const icoImgReturnArrayAfterSendingToCloudinary =
          await uploadImageWithThumbnailToCloudinary(
            originalValues.icoImgFull,
            "icoImgFull",
            "icoImgThumb"
          );

        finalDataToBeSent.icoImgFull =
          icoImgReturnArrayAfterSendingToCloudinary.icoImgFull;
        finalDataToBeSent.icoImgThumb =
          icoImgReturnArrayAfterSendingToCloudinary.icoImgThumb;
      }

      //projects genre dependent details
      const { genre } = finalDataToBeSent;
      switch (genre) {
        case "APP":
          const isAppImageFullACloudinaryUrl = checkIfIsCloudinaryUrl(
            originalValues.appInfo.appImageFull
          );
          const isAppImageThumbACloudinaryUrl = checkIfIsCloudinaryUrl(
            originalValues.appInfo.appImageThumb
          );

          if (!isAppImageFullACloudinaryUrl || !isAppImageThumbACloudinaryUrl) {
            const appImageArrayAfterSendingToCloudinary =
              await uploadImageWithThumbnailToCloudinary(
                originalValues.appInfo.appImageFull,
                "appImageFull",
                "appImageThumb"
              );
            finalDataToBeSent.appInfo.appImageFull =
              appImageArrayAfterSendingToCloudinary.appImageFull;
            finalDataToBeSent.appInfo.appImageThumb =
              appImageArrayAfterSendingToCloudinary.appImageThumb;
          }
          break;

        case "ANIMATION":
          const isVideoSourceThumbACloudinaryUrl = checkIfIsCloudinaryUrl(
            originalValues.videoSourceThumb
          );

          if (!isVideoSourceThumbACloudinaryUrl) {
            const videoSourceArrayAfterSendingToCloudinary =
              await uploadImageWithThumbnailToCloudinary(
                originalValues.videoSourceThumb,
                "videoSourceThumb",
                "videoSourceThumb_unused"
              );

            finalDataToBeSent.videoSourceThumb =
              videoSourceArrayAfterSendingToCloudinary.videoSourceThumb;
          }
          break;

        case "GRAPHIC":
          try {
            const resultImagesArray =
              await updateArrayForGraphicsWithCloudinaryUrls(
                originalValues.images
              );
            finalDataToBeSent.images = [...resultImagesArray];
          } catch (error) {
            console.log(error);
          }
          break;

        default:
          throw new Error(`Provided genre: ${genre} Was not matched.`);
      }

      console.log({ originalValues });
      console.log({ finalDataToBeSent });

      //final request
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}api/projects/${projectId}`,
        "PATCH",
        JSON.stringify(finalDataToBeSent),
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      );

      setShowSpinner(false);

      //confirmation modal
      setShowConfirmModal(true);

      const timer = () => {
        setTimeout(() => {
          setShowConfirmModal(false);
        }, 1600);
      };
      timer();

      clearTimeout(timer);
    } catch (error) {
      setShowSpinner(false);
      console.log(error);
    }

    //full reset of form
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
  };

  //       case "GRAPHIC":
  //         try {
  //           const resultImagesArray =
  //             await generateArrayForGraphicsWithCloudinaryUrls(
  //               originalValues
  //             );
  //           finalDataToBeSent.images = [...resultImagesArray];
  //         } catch (error) {
  //           console.log(error);
  //         }
  //         break;

  //       case "PANORAMA":
  //         try {
  //           const resultPanoramasArray =
  //             await generateArrayForPanoramaWithCloudinaryUrls(
  //               originalValues
  //             );
  //           finalDataToBeSent.panoramas = [...resultPanoramasArray];
  //         } catch (error) {}
  //         break;

  //       default:
  //     }

  async function updateArrayForGraphicsWithCloudinaryUrls(imagesArray) {
    return new Promise(async (resolve, reject) => {
      const result = [];

      try {
        for (const image of imagesArray) {
          const newImageArrayDataSet = {};

          newImageArrayDataSet.imageAltPl = image.imageAltPl;
          newImageArrayDataSet.imageAltEn = image.imageAltEn;
          newImageArrayDataSet.isBig = image.isBig;

          const isImageSourceFullACloudinaryUrl = checkIfIsCloudinaryUrl(
            image.imageSourceFull
          );
          const isImageSourceThumbACloudinaryUrl = checkIfIsCloudinaryUrl(
            image.imageSourceThumb
          );

          if (
            !isImageSourceFullACloudinaryUrl ||
            !isImageSourceThumbACloudinaryUrl
          ) {
            const imagesFieldsReturnArrayAfterSendingToCloudinary =
              await uploadImageWithThumbnailToCloudinary(
                image.imageSourceFull,
                "imageSourceFull",
                "imageSourceThumb"
              );

            newImageArrayDataSet.imageSourceFull =
              imagesFieldsReturnArrayAfterSendingToCloudinary.imageSourceFull;
            newImageArrayDataSet.imageSourceThumb =
              imagesFieldsReturnArrayAfterSendingToCloudinary.imageSourceThumb;
          } else {
            newImageArrayDataSet.imageSourceFull = image.imageSourceFull;
            newImageArrayDataSet.imageSourceThumb = image.imageSourceThumb;
          }
          result.push(newImageArrayDataSet);
        }
      } catch (error) {
        reject(error);
      }

      resolve(result);
    });
  }

  const uploadImageWithThumbnailToCloudinary = async (
    image,
    fullImageFieldName,
    thumbnailFieldName
  ) => {
    return new Promise(async (resolve, reject) => {
      const presetWithThumbnail = "j4s64pa3";
      const cloudName = "dn8l30dkf";
      const cloudinaryUrlBase = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", presetWithThumbnail);

      const responseData = await sendRequest(
        cloudinaryUrlBase,
        "POST",
        formData
      );

      const imageUrlWithOriginalSize = responseData.secure_url;
      const imageUrlThumbnailSize = responseData.eager[0].secure_url;

      if (imageUrlWithOriginalSize && imageUrlThumbnailSize) {
        const result = {};
        result[fullImageFieldName] = imageUrlWithOriginalSize;
        result[thumbnailFieldName] = imageUrlThumbnailSize;
        resolve(result);
      } else {
        reject({ error: "Some problem has occured." });
      }
    });
  };

  // const onSubmit = async (values, onSubmitProps) => {
  //   try {
  //     const formData = new FormData();
  //     buildFormData(formData, values, null);

  //     //logs
  //     console.log("formData: ", [...formData]);

  //     await sendRequest(
  //       `${process.env.REACT_APP_BACKEND_URL}api/projects/${projectId}`,
  //       "PATCH",
  //       formData,
  //       { Authorization: `Bearer ${token}` }
  //     );

  //     setShowConfirmModal(true);
  //     const timer = () => {
  //       setTimeout(() => {
  //         setShowConfirmModal(false);
  //       }, 1600);
  //     };
  //     timer();
  //     clearTimeout(timer);
  //   } catch (error) {}

  //   const timer = () => {
  //     setTimeout(() => {
  //       onSubmitProps.setSubmitting(false);
  //       onSubmitProps.setStatus({ success: true });
  //       onSubmitProps.resetForm({});
  //       dispatch(formActions.resetGenreOfProjectToNull());
  //       navigate("../../api/projects");
  //     }, 1750);
  //   };
  //   timer();
  //   clearTimeout(timer);
  //   console.log("submit");
  // };

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
      {showSpinner && <LoadingSpinner asOverlay />}
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
            console.log({ formik });

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

//utils
export function extractAllImagesUrls(project) {
  let resultArray = [];

  const flattenProject = objectFlattenDeep(project);

  //filtering off all thumbnail images urls
  //filtering off all duplicates
  resultArray = flattenProject
    .filter((el) => checkIfIsCloudinaryUrl(el))
    .filter((el) => el.includes("res.cloudinary") && el.includes("upload/v"));
  resultArray = _.uniqBy(resultArray);

  return resultArray;
}

export function checkIfIsCloudinaryUrl(value) {
  return (
    typeof value === "string" &&
    value.includes("https://res.cloudinary.com/dn8l30dkf/image/upload/")
  );
}

export function generateListOfImagesToBeDeleted(originalArray, finalArray) {
  const result = [];

  for (const originalEl of originalArray) {
    let appearance = 0;
    for (const el of finalArray) {
      if (originalEl === el) appearance++;
    }
    if (appearance === 0) result.push(originalEl);
  }
  return result;
}

// const generateArrayForGraphicsWithCloudinaryUrls = async (originalObject) => {
//   return new Promise(async (resolve, reject) => {
//     const resultImages = [];
//     try {
//       for (let image of originalObject.images) {
//         const newImageArrayDataSet = {};

//         newImageArrayDataSet.imageAltPl = image.imageAltPl;
//         newImageArrayDataSet.imageAltEn = image.imageAltEn;
//         newImageArrayDataSet.isBig = image.isBig;

//         const originalSizeImageName = "imageSourceFull";
//         const thumbnailImageName = "imageSourceThumb";

//         const imagesFields = await uploadImageAndCreateThumbnailInCloudinary(
//           image.imageSourceFull,
//           originalSizeImageName,
//           thumbnailImageName
//         );

//         newImageArrayDataSet[originalSizeImageName] =
//           imagesFields[originalSizeImageName];
//         newImageArrayDataSet[thumbnailImageName] =
//           imagesFields[thumbnailImageName];

//         resultImages.push(newImageArrayDataSet);
//       }
//     } catch (error) {
//       reject(error);
//     }
//     resolve(resultImages);
//   });
// };

function objectFlattenDeep(obj) {
  const result = [];
  for (const prop in obj) {
    const value = obj[prop];
    if (typeof value === "object") {
      result.push(objectFlattenDeep(value));
    } else {
      result.push(value);
    }
  }
  return _.flattenDeep(result);
}

////exports
export default UpdateProject;
