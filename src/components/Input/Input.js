import React from "react";
import classes from "./Input.module.css";
import classNames from "classnames";

function Input(props) {
  let inputClassNames = classNames(props.className, classes["input"], {
    [classes["input__invalid"]]: !props.valid
  });

  return <input {...props} className={inputClassNames} />;
}

export default Input;
