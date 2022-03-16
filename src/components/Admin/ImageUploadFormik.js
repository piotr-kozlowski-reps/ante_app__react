import React, { Fragment, useRef, useState, useEffect } from "react";
import { Field, ErrorMessage } from "formik";
import TextErrorFormik from "./TextErrorFormik";
import { useDropzone } from "react-dropzone";

import Button from "../../shared/components/Button";

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
  const [previewUrl, setPreviewUrl] = useState();

  const [isValid, setIsValid] = useState(false);

  const {
    label,
    name,
    errors,
    // placeholder,
    touched,
    additionalClass,
    ...rest
  } = props;

  //useDropZone part - start
  const onDrop = (acceptedFile, rejectedFile) => {
    if (acceptedFile.length === 1) {
      setFile(acceptedFile[0]);
    } else {
      console.log({ rejectedFile });
    }
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop,
  });
  //useDropZone part - end

  // useEffect(() => {
  //   console.log({ acceptedFiles });
  // }, [acceptedFiles]);

  // useEffect(() => {
  //   console.log({ fileRejections });
  // }, [fileRejections]);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  ////func
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

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
              console.log(formik);
              console.log("errors: ");
              console.table(formik.form.errors);
              console.log("values: ");
              console.table(formik.form.values);

              const { field, form } = formik;
              const { value, onChange, onBlur } = field;
              const { errors, touched } = form;

              const isErrorPresent = getNestedObject(errors, name);
              const isTouched = getNestedObject(touched, name);

              //// func
              const setImageInFormikHandler = () => {
                console.log("setImageInFormik");
                formik.form.setFieldValue(field);
              };

              return (
                <input
                  id={name}
                  name={name}
                  type="file"
                  {...rest}
                  onChange={setImageInFormikHandler}
                  // onChange={pickHandler}
                  onBlur={onBlur}
                  style={{ display: "none" }}
                  className={isErrorPresent && isTouched ? "input-invalid" : ""}
                  accept=".jpg,.png,.jpeg,.gif"
                  ref={filePickerRef}
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
