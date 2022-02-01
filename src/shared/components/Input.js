import React, { useReducer, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { validate } from "../utils/validators";
import { VALIDATOR_ARRAY_AT_LEAST_ONE } from "../utils/validators";

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
  ////vars
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || props.element === "multiselect" ? [] : "",
    isValid: false,
    isTouched: props.initialValid || false,
  });

  // console.log(inputState.value);

  const [selected, setSelected] = useState(props.options || null);

  ////effects
  //overall update effect
  const { id, onInput } = props;
  const { value, isValid } = inputState;
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  //updating inputStateValue for types (when multiselect)
  useEffect(() => {
    let typesArray = [];
    if (props.element === "multiselect" && selected.length > 0) {
      selected.forEach((el) => {
        if (el.isChecked) typesArray.push(el.value);
      });
      dispatch({
        type: "CHANGE",
        val: typesArray,
        validators: props.validators,
      });
    }
  }, [selected, props.element]);

  ////func
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

  const typeButtonHandler = (typePassed) => {
    dispatch({ type: "TOUCH" });
    const arrayCopy = [...selected];
    const choosenItem = arrayCopy.find((el) => el.label === typePassed);
    choosenItem.isChecked = !choosenItem.isChecked;
    const resultArray = arrayCopy.filter((el) => el.label !== typePassed);
    resultArray.push(choosenItem);
    setSelected(resultArray);
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
      element = props.options.map((el) => (
        <div
          key={el.label}
          className={`button button--default btn-lighter no-py-top ${
            el.isChecked ? "btn-lighter-checked" : ""
          }`}
          onClick={typeButtonHandler.bind(null, el.label)}
        >
          {el.label}
        </div>
      ));
      // <MultiSelect
      //   options={props.options}
      //   value={selected}
      //   onChange={setSelected}
      //   labelledBy="Select"
      // />
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
