import React from "react";
import classes from "./Input.module.css";
import classNames from "classnames";

function Input(props) {
  const { valid, ...otherProps } = props;

  let inputClassNames = classNames(props.className, classes["input"], {
    [classes["invalid"]]: !valid
  });

  return (
    <input {...otherProps} className={inputClassNames} autoComplete="on" />
  );
}

export default Input;
