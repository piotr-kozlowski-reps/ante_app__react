import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import TextErrorFormik from "./TextErrorFormik";
import { useDropzone } from "react-dropzone";
import URL_BASE from "../../shared/utils/url-base";

import Modal from "../../shared/components/Modal";
import Separator from "../../shared/components/Separator";

import noImagePicked from "../../images/nima.jpg";

////func
const getNestedObject = (obj, path) => {
  if (typeof obj === "undefined" || obj === null) return null;
  if (typeof path === "string") path = path.split(".");

  if (path.length === 0) return obj;
  return getNestedObject(obj[path[0]], path.slice(1));
};

const ImageUploadFormik = (props) => {
  ////vars
  const formikProps = useFormikContext();
  const { label, name, errors, touched, additionalClass, ...rest } = props;

  const [file, setFile] = useState();
  const [rejectedFile, setRejectedFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalContent, setModalContent] = useState(
    "Some error occurred during file validation. Try again, please."
  );

  console.log({ formikProps });

  //useDropZone - start
  const onDrop = (acceptedFile, rejectedFile) => {
    if (acceptedFile.length === 1) {
      setFile(acceptedFile[0]);
      setRejectedFile(null);
      return;
    }

    if (rejectedFile.length === 1) {
      setRejectedFile(rejectedFile[0]);
      return;
    }

    if (rejectedFile.length > 1) {
      setRejectedFile(rejectedFile);
      return;
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept: ["image/png", "image/jpg", "image/jpeg", "image/gif"],
    maxFiles: 1,
    onDrop,
  });
  //useDropZone - end

  ////func
  const setErrorAndTouched = () => {
    formikProps.setFieldTouched(name, true);
    formikProps.setFieldError(name, "dfvsdfv");
  };

  const setIsTouchedWhenFocused = () => {
    formikProps.setFieldTouched(name, true);
  };

  const setFileInFormik = useCallback(() => {
    formikProps.setFieldValue(name, file);
  }, [file]);

  const clearErrorInFormik = useCallback(() => {
    formikProps.setFieldError(name, null);
  }, [file]);

  const showModalWhenNeeded = () => {
    setShowConfirmModal(true);

    const timer = () => {
      setTimeout(() => {
        setShowConfirmModal(false);
      }, 2500);
    };
    timer();

    clearTimeout(timer);
  };

  //effects
  //set file thumbnail url if in updateForm mode and
  useEffect(() => {
    let urlResult = URL_BASE;
    let fieldPathRestored = "";

    if (name.includes(".")) {
      const urlElements = name.split(".");
      urlElements.forEach((el, index) => {
        if (isNaN(el)) fieldPathRestored += `.${el}`;
        if (!isNaN(el)) fieldPathRestored += `[${el}]`;
      });

      urlResult += eval(`formikProps.values${fieldPathRestored}`);
    }

    if (!name.includes(".")) {
      urlResult += `${formikProps.values[name]}`;
    }

    if (urlResult.endsWith("/undefined") || urlResult.endsWith(URL_BASE))
      return;

    //TODO: if string in update provided -> set the thumbnail - not full res image to show
    setPreviewUrl(urlResult);
  }, []);

  //if file changes and is valid, makes prev and sets "previewUrl" and sets Formik Value and clears error
  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);

    setFileInFormik();
    clearErrorInFormik();
  }, [file, name, setFileInFormik]);

  //if (no proper file and rejected file) sets error and isTouched - to show validation error
  //if (is proper file and rejected file) sets modal for a moment saying
  useEffect(() => {
    const isFileAlready = file && file.path !== "" ? true : false;
    const isRejectedFile = rejectedFile;

    if (!isFileAlready && isRejectedFile) {
      console.log("setting error and touched");
      setErrorAndTouched();
      return;
    }

    if (isFileAlready && isRejectedFile) {
      if (Array.isArray(rejectedFile)) {
        setModalContent(`You can only provide one file.`);
      }

      if (!Array.isArray(rejectedFile)) {
        setModalContent(`Formats supported:  .jpg  .jpeg  .png  .gif`);
      }

      showModalWhenNeeded();
      return;
    }
  }, [rejectedFile, file]);

  //if focused - set isTouched in Formik
  useEffect(() => {
    if (isFocused) setIsTouchedWhenFocused();
  }, [isFocused]);

  const isErrorPresent = getNestedObject(formikProps.errors, name);
  const isTouched = getNestedObject(formikProps.touched, name);

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
          <p>{modalContent}</p>
        </div>
      </Modal>
      <div className={props.additionalClass ? props.additionalClass : ""}>
        <label
          htmlFor={name}
          className={`details ${additionalClass ? additionalClass : ""}`}
        >
          {label}
        </label>
        <div className={`input-box-image`}>
          <div
            className={
              isErrorPresent && isTouched
                ? "thumbnail-admin-form thumbnail-error"
                : "thumbnail-admin-form "
            }
          >
            <img
              width="100"
              height="80"
              src={previewUrl ? previewUrl : noImagePicked}
              alt={previewUrl && file ? file.name : "no file selected"}
              className={isErrorPresent && isTouched ? "image-error" : ""}
            ></img>
          </div>
          {/* <Field id={name} name={name} {...rest}>
            {(formik) => {
              //logs
              // console.log(formik);
              // console.table(formik.form.errors);
              // console.table(formik.form.values);

              const { field, form } = formik;
              const { value, onChange, onBlur } = field;
              const { errors, touched } = form;

              const isErrorPresent = getNestedObject(errors, name);
              const isTouched = getNestedObject(touched, name);
              console.log({ isErrorPresent });
              console.log({ isTouched });

              //// func
              // const setImageInFormikHandler = (event) => {
              //   console.log("setImageInFormik");
              //   console.log(event);
              //   event.preventDefault();
              //   formik.form.setFieldValue(name, file);
              // };

              return (
                <input
                  id={name}
                  name={name}
                  type="file"
                  {...rest}
                  // onChange={setImageInFormikHandler}
                  // onChange={pickHandler}
                  onBlur={onBlur}
                  style={{ display: "none" }}
                  className={isErrorPresent && isTouched ? "input-invalid" : ""}
                  accept=".jpg,.png,.jpeg,.gif"
                />
              );
            }}
          </Field> */}

          <Field id={name} name={name} style={{ display: "none" }}>
            {/* <input
              id={name}
              name={name}
              type="file"
              // {...rest}
              // onChange={setImageInFormikHandler}
              // onChange={pickHandler}
              // onBlur={onBlur}
              style={{ display: "none" }}
              className={isErrorPresent && isTouched ? "input-invalid" : ""}
              accept=".jpg,.png,.jpeg,.gif"
            /> */}
          </Field>

          <div
            className={
              isDragActive ? "drop-zone drop-zone-active" : "drop-zone"
            }
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <div className="drop-zone-middle-zone">
              <p className="center drop-zone-text">
                {isDragActive
                  ? "DROP FILE HERE"
                  : !previewUrl
                  ? "DROP FILE HERE OR CLICK TO OPEN FILE BROWSER"
                  : "DROP FILE HERE OR CLICK TO CHANGE CHOSEN FILE"}
                <br />
                <span className="small-text">
                  {props.additionalText
                    ? props.additionalText
                    : `(Provide only one file. Formats supported: .jpg .jpeg .png
                  .gif)`}
                </span>
              </p>
            </div>
          </div>
        </div>
        <ErrorMessage name={name} component={TextErrorFormik} />
      </div>
    </Fragment>
  );
};

export default ImageUploadFormik;
