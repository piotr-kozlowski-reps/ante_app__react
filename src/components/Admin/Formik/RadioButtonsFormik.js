import React, { Fragment } from "react";
import { Field, ErrorMessage } from "formik";
import TextErrorFormik from "./TextErrorFormik";

const RadioButtonsFormik = (props) => {
  ////vars
  const { label, name, options, ...rest } = props;

  return (
    <Fragment>
      <div className={`input-box-checkboxes`}>
        <label className="details">{label}</label>

        <Field name={name} id={name} {...rest}>
          {({ field }) => {
            return options.map((option) => {
              return (
                <Fragment key={option.key}>
                  <div className="radio-item">
                    <input
                      type="radio"
                      id={option.value}
                      {...field}
                      value={option.value}
                      checked={field.value === option.value}
                    />
                    <label className="radio-label" htmlFor={option.value}>
                      {option.key}
                    </label>
                  </div>
                </Fragment>
              );
            });
          }}
        </Field>
      </div>
      <div className="text-center">
        <ErrorMessage name={name} component={TextErrorFormik} />
      </div>
    </Fragment>
  );
};

export default RadioButtonsFormik;
