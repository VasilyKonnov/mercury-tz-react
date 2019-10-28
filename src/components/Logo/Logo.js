import React from "react";
import classes from "./Logo.module.css";
import logo from "../../assets/img/logo.svg";

function Logo(props) {
  return (
    <img
      className={[classes["logo"]]}
      src={logo}
      alt="Logo Mercury Developers"
    />
  );
}

export default Logo;
