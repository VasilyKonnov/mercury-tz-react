import React from "react";
import classes from "./Input.module.css";

function Input(props) {
  let classNames = [classes["input"], props.className].join(" ");
  if (props.valid === 'false') {
    classNames = [classNames, classes["input__invalid"]].join(" ");
  }

  return (
    <input
      className={classNames}
      name={props.name}
      placeholder={props.placeholder}
      onChange={props.onChange}
      type={props.type}
      valid={props.valid}
    ></input>
  );
}

export default Input;
