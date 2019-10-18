import React from "react";
import classes from "./InputComponent.module.css";

function InputComponent(props) {
  const propsClasses = props.className ? props.className.join(" ") : "";
  const classNames = [classes["text-input"], propsClasses].join(" ");

  return (
    <div>
      <input
        className={classNames}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  );
}

export default InputComponent;
