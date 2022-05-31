import React, { Fragment } from "react";
import DateView from "react-date-picker";

import { Field, ErrorMessage } from "formik";

const DatePickerFormik = (props) => {
  const { label, name, errors, touched, ...rest } = props;
  let isError = false;
  return (
    <div className={`input-box`}>
      <label htmlFor={name} className="details">
        {label}
      </label>
      <Field
        name={name}
        id={name}
        // className={errors[name] && touched[name] ? "input-invalid" : ""}
        // {...rest}
      >
        {({ form, field }) => {
          const { setFieldValue, errors, touched, setTouched } = form;
          const { value, onBlur } = field;

          if (
            errors[name] &&
            (touched.day ||
              touched.month ||
              touched.year ||
              touched.completionDate)
          ) {
            isError = true;
          }
          return (
            <Fragment>
              <DateView
                id={name}
                name={name}
                {...field}
                {...rest}
                selected={value}
                onChange={(val) => setFieldValue(name, val)}
                onBlur={onBlur}
                className={`${isError ? "input-invalid" : ""} ${
                  props.additionalClass ? props.additionalClass : ""
                }`}
              />
              {isError && (
                <div className="text-center">
                  <div className="p-invalid">{errors[name]}</div>
                </div>
              )}
            </Fragment>
          );
        }}
      </Field>
    </div>
  );
};

export default DatePickerFormik;
