import React from "react";
import DatePickerFormik from "./DatePickerFormik";
import InputFormik from "./InputFormik";
import TextareaFormik from "./TextareaFormik";
import CheckboxGroupFormik from "./CheckboxGroupFormik";
import RadioButtonsFormik from "./RadioButtonsFormik";
import CheckboxFormik from "./CheckboxFormik";

const FormikControl = (props) => {
  ////vars
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <InputFormik {...rest} />;
    case "textarea":
      return <TextareaFormik {...rest} />;
    case "select":
    case "radio":
      return <RadioButtonsFormik {...rest} />;
    case "checkbox":
      return <CheckboxFormik {...rest} />;
    case "checkboxGroup":
      return <CheckboxGroupFormik {...rest} />;
    case "date":
      return <DatePickerFormik {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
