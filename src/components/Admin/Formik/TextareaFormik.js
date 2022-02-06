import React from "react";
import { Field, ErrorMessage } from "formik";
import TextErrorFormik from "./TextErrorFormik";

const TextareaFormik = (props) => {
  const { label, name, errors, placeholder, touched, ...rest } = props;

  return (
    <div className={`input-box`}>
      <label htmlFor={name} className="details">
        {label}
      </label>
      <Field
        as="textarea"
        id={name}
        name={name}
        className={errors[name] && touched[name] ? "input-invalid" : ""}
        placeholder={placeholder}
        {...rest}
      />
      <ErrorMessage name={name} component={TextErrorFormik} />
    </div>
  );
};

export default TextareaFormik;
