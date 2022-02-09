import React, { Fragment } from "react";
import { Field, ErrorMessage } from "formik";
import TextErrorFormik from "./TextErrorFormik";

const CheckboxGroupFormik = (props) => {
  ////vars
  const { label, name, options, ...rest } = props;

  return (
    <div className={`input-box-checkboxes`}>
      <label className="details">{label}</label>

      <Field
        name={name}
        id={name}
        // className={errors[name] && touched[name] ? "input-invalid" : ""}
        {...rest}
      >
        {({ field }) => {
          return options.map((option) => {
            return (
              <Fragment key={option.key}>
                <label className="checkbox" htmlFor={option.value}>
                  <input
                    type="checkbox"
                    id={option.value}
                    {...field}
                    value={option.value}
                    checked={field.value.includes(option.value)}
                    className="checkbox__input"
                  />
                  <div className="checkbox__box"></div>
                  {option.key}
                </label>
              </Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextErrorFormik} />
    </div>
  );
};

export default CheckboxGroupFormik;
