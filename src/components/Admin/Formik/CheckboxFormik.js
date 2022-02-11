import React from "react";
import { Field, ErrorMessage } from "formik";
import TextErrorFormik from "./TextErrorFormik";

////func
const getNestedObject = (obj, path) => {
  if (typeof obj === "undefined" || obj === null) return null;
  if (typeof path === "string") path = path.split(".");

  if (path.length === 0) return obj;
  return getNestedObject(obj[path[0]], path.slice(1));
};

const CheckboxFormik = (props) => {
  const { label, name, errors, placeholder, touched, ...rest } = props;

  return (
    <div className={`input-box`}>
      {/* <label htmlFor={name} className="details">
        {label}
      </label> */}
      <Field id={name} name={name} {...rest}>
        {(formik) => {
          const { field, form } = formik;
          const { value, onChange, onBlur } = field;
          const { errors, touched } = form;

          const isErrorPresent = getNestedObject(errors, name);
          const isTouched = getNestedObject(touched, name);

          return (
            <label className="checkbox" htmlFor={value}>
              <input
                type="checkbox"
                name={name}
                id={name}
                {...form}
                value={value}
                onChange={(val) => onChange(val)}
                onBlur={onBlur}
                className={`checkbox__input ${
                  isErrorPresent && isTouched ? "input-invalid" : ""
                } ${props.additionalClass ? props.additionalClass : ""}`}
              />
              <div className="checkbox__box"></div>
              {label}
            </label>

            // <input
            //   id={name}
            //   name={name}
            //   value={value}
            //   type="checkbox"
            //   {...rest}
            //   onChange={(val) => onChange(val)}
            //   onBlur={onBlur}
            //   className={`${
            //     isErrorPresent && isTouched ? "input-invalid" : ""
            //   } ${props.additionalClass ? props.additionalClass : ""}`}
            // />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextErrorFormik} />
    </div>
  );
};

export default CheckboxFormik;

// <label>
//   <Field
//     type="checkbox"
//     name={`images.${index}.isBig`}
//   />
//   Is image big?
// </label>;
