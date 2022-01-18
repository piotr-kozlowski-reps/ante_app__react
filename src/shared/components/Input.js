import React, { useReducer } from "react";
import PropTypes from "prop-types";

//
//reducer info
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: true,
      };
    default:
      return state;
  }
};
const initialState = {
  value: "",
  isValid: false,
};

const Input = (props) => {
  //
  //vars
  const [inputState, dispatch] = useReducer(inputReducer, initialState);

  //
  //func
  const changeHandler = (event) => {
    dispatch({ type: "CHANGE", val: event.target.value });
  };

  //
  //input generation by type passed
  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
        className={`${!inputState.isValid && "input-invalid"}`}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={inputState.value}
      />
    );

  //
  //jsx
  return (
    <div className={`input-box `}>
      <label htmlFor={props.id} className="details">
        {props.label}
      </label>
      {element}
      {!inputState.isValid && (
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
};

export default Input;
