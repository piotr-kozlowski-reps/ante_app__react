import React, { Fragment, useState } from "react";
import { Formik, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import genre from "../../shared/utils/genre";
import {
  generateInitialValues,
  generateValidation,
} from "../../shared/utils/generateFormDataFactory";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";
import { formActions } from "../../shared/store/form-slice";
import _ from "lodash";

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
import Modal from "../../shared/components/Modal";

function FormikContainer() {
  ////vars
  const formStageCounter = useSelector((state) => state.form.formStageCounter);
  const genreOfProject = useSelector((state) => state.form.genreOfProject);
  const token = useSelector((state) => state.auth.token);
  const initialValues = generateInitialValues(genreOfProject);
  const validationSchema = generateValidation(genreOfProject);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const onSubmit = async (values, onSubmitProps) => {
    try {
      setShowSpinner(true);
      const originalValues = { ...values };
      const finalDataToBeSent = _.cloneDeep(originalValues);

      //icoImgCloudinaryUpload
      await uploadImageWithThumbnail(
        finalDataToBeSent.icoImgFull,
        finalDataToBeSent,
        "icoImgFull",
        "icoImgThumb"
      );

      //projects genre dependent details
      const { genre } = finalDataToBeSent;
      switch (genre) {
        case "APP":
          await uploadImageWithThumbnail(
            originalValues.appInfo.appImageFull,
            finalDataToBeSent,
            "appInfo.appImageFull",
            "appInfo.appImageThumb"
          );
          break;

        case "ANIMATION":
          await uploadImageWithoutThumbnail(
            originalValues.videoSourceThumb,
            finalDataToBeSent,
            "videoSourceThumb"
          );
          break;

        case "GRAPHIC":
          try {
            const resultImagesArray =
              await generateArrayForGraphicsWithCloudinaryUrls(originalValues);
            finalDataToBeSent.images = [...resultImagesArray];
          } catch (error) {
            console.log(error);
          }
          break;

        case "PANORAMA":
          try {
            const resultPanoramasArray =
              await generateArrayForPanoramaWithCloudinaryUrls(originalValues);
            finalDataToBeSent.panoramas = [...resultPanoramasArray];
          } catch (error) {}
          break;

        default:
      }

      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}api/projects`,
        "POST",
        JSON.stringify(finalDataToBeSent),
        { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
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

  const uploadImageAndCreateThumbnailInCloudinary = async (
    image,
    fullImageName,
    ThumbnailImageName
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
        result[fullImageName] = imageUrlWithOriginalSize;
        result[ThumbnailImageName] = imageUrlThumbnailSize;
        resolve(result);
      } else {
        reject({ error: "Some problem has occured." });
      }
    });
  };

  const uploadImageWithThumbnail = async (
    image,
    finalObject,
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
        const updateFullImageFieldNameString = `finalObject.${fullImageFieldName}="${imageUrlWithOriginalSize}"`;
        const updateThumbnailImageFieldNameString = `finalObject.${thumbnailFieldName}="${imageUrlThumbnailSize}"`;

        eval(updateFullImageFieldNameString);
        eval(updateThumbnailImageFieldNameString);

        resolve(true);
      } else {
        reject(false);
      }
    });
  };

  const uploadImageWithoutThumbnail = async (
    image,
    finalObject,
    fullImageFieldName
  ) => {
    return new Promise(async (resolve, reject) => {
      const presetWithThumbnail = "wajdla87";
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

      if (imageUrlWithOriginalSize) {
        const updateFullImageFieldNameString = `finalObject.${fullImageFieldName}="${imageUrlWithOriginalSize}"`;
        eval(updateFullImageFieldNameString);
        resolve(true);
      } else {
        reject(false);
      }
    });
  };

  const generateArrayForGraphicsWithCloudinaryUrls = async (originalObject) => {
    return new Promise(async (resolve, reject) => {
      const resultImages = [];
      try {
        for (let image of originalObject.images) {
          const newImageArrayDataSet = {};

          newImageArrayDataSet.imageAltPl = image.imageAltPl;
          newImageArrayDataSet.imageAltEn = image.imageAltEn;
          newImageArrayDataSet.isBig = image.isBig;

          const originalSizeImageName = "imageSourceFull";
          const thumbnailImageName = "imageSourceThumb";

          const imagesFields = await uploadImageAndCreateThumbnailInCloudinary(
            image.imageSourceFull,
            originalSizeImageName,
            thumbnailImageName
          );

          newImageArrayDataSet[originalSizeImageName] =
            imagesFields[originalSizeImageName];
          newImageArrayDataSet[thumbnailImageName] =
            imagesFields[thumbnailImageName];

          resultImages.push(newImageArrayDataSet);
        }
      } catch (error) {
        reject(error);
      }
      resolve(resultImages);
    });
  };

  const generateArrayForPanoramaWithCloudinaryUrls = async (originalValues) => {
    return new Promise(async (resolve, reject) => {
      const resultPanoramas = [];
      try {
        for (let panorama of originalValues.panoramas) {
          console.log({ panorama });

          const newPanoramaArrayDataSet = {};

          newPanoramaArrayDataSet.panoramaTitlePl = panorama.panoramaTitlePl;
          newPanoramaArrayDataSet.panoramaTitleEn = panorama.panoramaTitleEn;

          //panorama Icon image
          let originalSizePanoramaName = "panoramaIcoFull";
          let thumbnailPanoramaName = "panoramaIcoThumb";
          let panoramaImagesFields =
            await uploadImageAndCreateThumbnailInCloudinary(
              panorama.panoramaIcoFull,
              originalSizePanoramaName,
              thumbnailPanoramaName
            );
          newPanoramaArrayDataSet[originalSizePanoramaName] =
            panoramaImagesFields[originalSizePanoramaName];
          newPanoramaArrayDataSet[thumbnailPanoramaName] =
            panoramaImagesFields[thumbnailPanoramaName];

          //panorama Source Image
          originalSizePanoramaName = "panoramaImageSourceFull";
          thumbnailPanoramaName = "panoramaImageSourceFullThumb";
          panoramaImagesFields =
            await uploadImageAndCreateThumbnailInCloudinary(
              panorama.panoramaImageSourceFull,
              originalSizePanoramaName,
              thumbnailPanoramaName
            );
          newPanoramaArrayDataSet[originalSizePanoramaName] =
            panoramaImagesFields[originalSizePanoramaName];
          newPanoramaArrayDataSet[thumbnailPanoramaName] =
            panoramaImagesFields[thumbnailPanoramaName];

          resultPanoramas.push(newPanoramaArrayDataSet);
        }
      } catch (error) {
        reject(false);
      }
      resolve(resultPanoramas);
    });
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
      {showSpinner && <LoadingSpinner asOverlay />}
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
      {formStageCounter === 0 && !genreOfProject && (
        <AdminFormFooter isOnlyCancel={true} />
      )}
    </Fragment>
  );
}

export default FormikContainer;
