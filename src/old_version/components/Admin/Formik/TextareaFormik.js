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

const TextareaFormik = (props) => {
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

          const isErrorPresent = getNestedObject(errors, name);
          const isTouched = getNestedObject(touched, name);

          return (
            <textarea
              id={name}
              name={name}
              placeholder={placeholder}
              value={value}
              {...rest}
              onChange={(val) => onChange(val)}
              onBlur={onBlur}
              className={isErrorPresent && isTouched ? "input-invalid" : ""}
            ></textarea>
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextErrorFormik} />
    </div>
  );
};

export default TextareaFormik;

//     <Field id={name} name={name} {...rest}>
//       {(formik) => {
//         const { field, form } = formik;
//         const { value, onChange, onBlur } = field;
//         const { errors, touched } = form;
//         return (
//           <input
//             id={name}
//             name={name}
//             placeholder={placeholder}
//             value={value}
//             {...rest}
//             onChange={(val) => onChange(val)}
//             onBlur={onBlur}
//             className={errors[name] && touched[name] ? "input-invalid" : ""}
//           />
//         );
//       }}
//     </Field>
//     <ErrorMessage name={name} component={TextErrorFormik} />
