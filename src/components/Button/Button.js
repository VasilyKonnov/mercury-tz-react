import React from "react";
import classes from "./Button.module.css";

function Button(props) {
  const propsClasses = props.className ? props.className.join(" ") : "";
  const classNames = [classes["button"], propsClasses].join(" ");

  return (
    <button className={classNames} type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
