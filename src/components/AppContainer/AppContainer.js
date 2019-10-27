import React from "react";
import classes from "./AppContainer.module.css";
import LoginForm from "../LoginForm/loginForm";
import logo from "../../assets/img/logo.svg";

function AppContainer() {
  return (
    <div className={[classes["app"]]}>
      <img
        className={[classes["logo"]]}
        src={logo}
        alt="Logo Mercury Developers"
      />
      <LoginForm className={[classes["body"]]} />
    </div>
  );
}

export default AppContainer;
