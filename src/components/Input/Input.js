import React from "react";
import classes from "./Input.module.css";
import classNames from "classnames";

function Input(props) {
  const { valid, ...otherProps } = props;

  let inputClassNames = classNames(props.className, classes["input"], {
    [classes["input--invalid"]]: !valid
  });

  return <input {...otherProps} className={inputClassNames} />;
}

export default Input;
