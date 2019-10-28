import React from "react";
import classes from "./AppContainer.module.css";

function AppContainer(props) {
  return <div {...props} className={[classes["app"]]} />;
}

export default AppContainer;