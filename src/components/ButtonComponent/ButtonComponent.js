import React from "react";
import classes from "./ButtonComponent.module.css";

function ButtonComponent(props) {
  const propsClasses = props.className ? props.className.join(" ") : "";

  const classNames = [classes["button"], propsClasses].join(" ");

  return (
    <button className={classNames} type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default ButtonComponent;
