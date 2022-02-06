import React from "react";
import DatePickerFormik from "./DatePickerFormik";
import InputFormik from "./InputFormik";
import TextareaFormik from "./TextareaFormik";

const FormikControl = (props) => {
  ////vars
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <InputFormik {...rest} />;
    case "textarea":
      return <TextareaFormik {...rest} />;
    case "select":
    case "radiot":
    case "checkbox":
    case "date":
      return <DatePickerFormik {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
