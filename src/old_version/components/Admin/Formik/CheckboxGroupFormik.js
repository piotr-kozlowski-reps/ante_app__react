import React, { Fragment } from "react";
import { Field, ErrorMessage } from "formik";
import TextErrorFormik from "./TextErrorFormik";

const CheckboxGroupFormik = (props) => {
  ////vars
  const { label, name, options, ...rest } = props;

  ///jsx
  return (
    <Fragment>
      <div className={`input-box-checkboxes`}>
        <label className="details">{label}</label>

        <Field name={name} id={name} {...rest}>
          {({ field }) => {
            return options.map((option) => {
              return (
                <Fragment key={option.key}>
                  <div>
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

export default CheckboxGroupFormik;
