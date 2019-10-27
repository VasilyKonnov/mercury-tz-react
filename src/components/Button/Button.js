import React from "react";
import classes from "./Button.module.css";
import classNames from "classnames";

function Button(props) {
  let buttonClassNames = classNames(props.className, classes["button"]);

  return (
    <button {...props} className={buttonClassNames}>
      {props.children}
    </button>
  );
}

export default Button;
