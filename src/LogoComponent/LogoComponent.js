import React from "react";
import classes from "./LogoComponent.module.scss";

function LogoComponent() {
  return (
    <div
      className={[classes["logo-log-in_layout"], classes["logo-log-in"]].join(
        " "
      )}
    >
      <img
        className={classes["logo-log-in__img"]}
        src="./../img/Logo.svg"
        alt="Logo Mercury Developers"
      />
    </div>
  );
}

export default LogoComponent;
