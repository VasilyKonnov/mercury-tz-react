import React from "react";
import classes from "./Input.module.css";
import cx from "classnames";

function Input(props) {
  let classNames = cx(props.className, classes["input"], {
    [classes["input__invalid"]]: !props.valid
  });

  return <input {...props} className={classNames} />;
}

export default Input;
