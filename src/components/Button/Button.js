import React from "react";
import classes from "./Button.module.css";
import cx from "classnames";

function Button(props) {
  let classNames = cx(props.className, classes["button"]);

  return (
    <button {...props} className={classNames}>
      {props.children}
    </button>
  );
}

export default Button;
