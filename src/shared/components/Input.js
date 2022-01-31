import React, { useReducer, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MultiSelect } from "react-multi-select-component";
import { validate } from "../utils/validators";

//
//reducer info
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  //
  //vars
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || [],
    isValid: false,
    isTouched: props.initialValid || false,
  });

  const [selected, setSelected] = useState([]);

  //
  //effects
  const { id, onInput } = props;
  const { value, isValid } = inputState;
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  //
  //func
  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };

  //
  //input generation by type passed
  let element;
  switch (props.element) {
    case "input":
      element = (
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
          className={`${
            !inputState.isValid && inputState.isTouched && "input-invalid"
          }`}
        />
      );
      break;

    case "textarea":
      element = (
        <textarea
          id={props.id}
          rows={props.rows || 3}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        />
      );
      break;

    case "multiselect":
      element = (
        <MultiSelect
          options={props.options}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
        />
      );
      break;

    default:
      element = (
        <textarea
          id={props.id}
          rows={props.rows || 3}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        />
      );
  }

  //
  //jsx
  return (
    <div className={`input-box `}>
      <label htmlFor={props.id} className="details">
        {props.label}
      </label>
      {element}
      {!inputState.isValid && inputState.isTouched && (
        <p className={`${!inputState.isValid && "p-invalid"}`}>
          {props.errorText}
        </p>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  element: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  errorText: PropTypes.string,
  validators: PropTypes.any,
  onInput: PropTypes.func,
  initialValue: PropTypes.any,
  initialValid: PropTypes.bool,
  options: PropTypes.array,
};

export default Input;
