import React from "react";
import { Field, ErrorMessage } from "formik";
import TextErrorFormik from "./TextErrorFormik";

const InputFormik = (props) => {
  const { label, name, errors, placeholder, touched, ...rest } = props;

  return (
    <div className={`input-box`}>
      <label htmlFor={name} className="details">
        {label}
      </label>
      <Field id={name} name={name} {...rest}>
        {(formik) => {
          const { field, form } = formik;
          const { value, onChange, onBlur } = field;
          const { errors, touched } = form;
          return (
            <input
              id={name}
              name={name}
              placeholder={placeholder}
              value={value}
              {...rest}
              onChange={(val) => onChange(val)}
              onBlur={onBlur}
              className={errors[name] && touched[name] ? "input-invalid" : ""}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextErrorFormik} />
    </div>
  );
};

export default InputFormik;
