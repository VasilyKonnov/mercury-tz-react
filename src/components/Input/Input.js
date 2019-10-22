import React from "react";
import classes from "./Input.module.css";

function Input(props) {
  let classNames = [classes["input"], props.className].join(" ");
  if (!props.valid) {
    classNames = [classNames, classes["input__invalid"]].join(" ");
  }
  return <input {...props} className={classNames} />;
}

export default Input;
