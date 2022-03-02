import React, { Fragment, useRef, useState, useEffect } from "react";
import { Field, ErrorMessage } from "formik";
import TextErrorFormik from "./TextErrorFormik";

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
  const [icoFile, setIcoFile] = useState();
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

  const filePickerRef = useRef();

  useEffect(() => {
    if (!icoFile) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(icoFile);
  }, [icoFile]);

  ////func
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const pickHandler = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      const pickedFile = event.target.files[0];
      setIcoFile(pickedFile);
      setIsValid(true);
      console.log(pickedFile);
    } else {
      setIsValid(false);
    }
  };

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
              src={previewUrl ? previewUrl : noImagePicked}
              alt={previewUrl ? icoFile.name : "no file selected"}
              // onClick={navigateToEditProject}
              // style={{ cursor: "pointer" }}
            ></img>
          </div>
          <Field id={name} name={name} {...rest}>
            {(formik) => {
              console.log(formik);
              const { field, form } = formik;
              const { value, onChange, onBlur } = field;
              const { errors, touched } = form;

              const isErrorPresent = getNestedObject(errors, name);
              const isTouched = getNestedObject(touched, name);

              ////func
              const setImageInFormik = (event) => {
                formik.form.setFieldValue(name, event.target.files[0]);
              };

              return (
                <input
                  id={name}
                  name={name}
                  type="file"
                  // value={value}
                  {...rest}
                  onChange={setImageInFormik}
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

          <div>
            <Button type="button" onClick={pickImageHandler}>
              {!previewUrl ? "CHOOSE IMAGE" : "CHOOSE ANOTHER IMAGE"}
            </Button>
            <p className="image-src">{previewUrl ? icoFile.name : ""}</p>
          </div>
        </div>
        <ErrorMessage name={name} component={TextErrorFormik} />
      </div>
    </Fragment>
  );
};

export default ImageUploadFormik;
