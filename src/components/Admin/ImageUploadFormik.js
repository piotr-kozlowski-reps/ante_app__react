import React, { Fragment, useRef, useState, useEffect } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import TextErrorFormik from "./TextErrorFormik";
import { useDropzone } from "react-dropzone";

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
  const [file, setFile] = useState();
  const [rejectedFile, setRejectedFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const formikProps = useFormikContext();

  console.log("values: ", formikProps.values);
  console.log("errors: ");
  console.log(formikProps);
  // console.log({ file });
  // console.log({ rejectedFile });

  const { label, name, errors, touched, additionalClass, ...rest } = props;

  //useDropZone part - start
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
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    // accept: "image/*",
    accept: ["image/png", "image/jpg", "image/jpeg", "image/gif"],
    maxFiles: 1,
    onDrop,
  });
  //useDropZone part - end

  // useEffect(() => {
  //   console.log({ fileRejections });
  // }, [fileRejections]);

  // const filePickerRef = useRef();

  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
    formikProps.setFieldValue(name, file);
  }, [file, name, formikProps]);

  useEffect(() => {
    const isFileAlready = file && file.length === 1 ? true : false;
    const isRejectedFile = rejectedFile;

    if (!isFileAlready && isRejectedFile) {
      console.log("zmieniam wpis do errors i touched");
      console.log(formikProps);
      formikProps.setFieldError(name, "dfvsdfv");
      formikProps.setFieldTouched(true);
    }

    // if (!isFileAlready && isRejectedFile) {
    //   console.log("rejected effect", rejectedFile.errors.code);
    // }
  }, [rejectedFile]);

  ////func
  // const pickImageHandler = () => {
  //   console.log("pickImageHandler");
  //   // filePickerRef.current.click();
  //   filePickerRef.current.click();
  // };

  // const addFileToFormikField = () => {
  //   console.log({ file });
  //   console.log(props.formik);
  // };

  // const pickHandler = (event) => {
  //   if (event.target.files && event.target.files.length === 1) {
  //     const pickedFile = event.target.files[0];
  //     setIcoFile(pickedFile);
  //     setIsValid(true);
  //   } else {
  //     setIsValid(false);
  //   }
  // };

  ////jsx
  return (
    <Fragment>
      <div>
        <label
          htmlFor={name}
          className={`details ${additionalClass ? additionalClass : ""}`}
        >
          {label}
        </label>
        <div className={`input-box-image`}>
          <div className="thumbnail-admin-form">
            <img
              width="100"
              height="80"
              src={previewUrl ? previewUrl : noImagePicked}
              alt={previewUrl ? file.name : "no file selected"}
            ></img>
          </div>
          <Field id={name} name={name} {...rest}>
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
                  // ref={filePickerRef}
                />
              );
            }}
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
