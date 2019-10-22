import React from "react";
import classes from "./Input.module.css";
import cx from "classnames";

function Input(props) {
  let classNames = cx(props.className, classes["input"]);

  return <input {...props} className={classNames} />;
}

export default Input;
