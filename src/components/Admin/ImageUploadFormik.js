import React, { Fragment, useRef } from "react";
import { Field, ErrorMessage } from "formik";
import TextErrorFormik from "./TextErrorFormik";

import Button from "../../shared/components/Button";

////func
const getNestedObject = (obj, path) => {
  if (typeof obj === "undefined" || obj === null) return null;
  if (typeof path === "string") path = path.split(".");

  if (path.length === 0) return obj;
  return getNestedObject(obj[path[0]], path.slice(1));
};

const ImageUploadFormik = (props) => {
  ////vars
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
  let imageAlt = "no image chosen";
  let imageSrc = "no path - no image chosen";

  ////func
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const pickHandler = (event) => {
    console.log(event.target);
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
              src="{icoImgThumb}"
              alt={imageAlt}
              // onClick={navigateToEditProject}
              // style={{ cursor: "pointer" }}
            ></img>
          </div>
          <Field id={name} name={name} {...rest}>
            {(formik) => {
              const { field, form } = formik;
              const { value, onChange, onBlur } = field;
              const { errors, touched } = form;

              const isErrorPresent = getNestedObject(errors, name);
              const isTouched = getNestedObject(touched, name);

              return (
                <input
                  id={name}
                  name={name}
                  // placeholder={placeholder}
                  type="file"
                  // value={value}
                  {...rest}
                  // onChange={(val) => onChange(val)}
                  onChange={pickHandler}
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
              CHOOSE IMAGE
            </Button>
            <p className="image-src">{imageSrc}</p>
          </div>
        </div>
        <ErrorMessage name={name} component={TextErrorFormik} />
      </div>
    </Fragment>
  );
};

export default ImageUploadFormik;
