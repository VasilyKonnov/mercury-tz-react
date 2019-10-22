import React from "react";
import classes from "./AppContainer.module.css";
import LoginForm from "../LoginForm/loginForm";
import logo from "../../assets/img/logo.svg";

function AppContainer() {
  return (
    <div className={[classes["app"]]}>
      <img
        className={[classes["app__logo"]]}
        src={logo}
        alt="Logo Mercury Developers"
      />
      <LoginForm className={[classes["app__body"], "panel"]} />
    </div>
  );
}

export default AppContainer;
