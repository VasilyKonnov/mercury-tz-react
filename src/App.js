import React from "react";
import LogoComponent from "./LogoComponent/LogoComponent";
import LoginForm from "./LoginForm/LoginForm";
import "./App.module.scss";
import classes from "./App.module.scss";

class App extends React.Component {
  render() {
    return (
      <div>
        <LogoComponent />
        <LoginForm />
      </div>
    );
  }
}

export default App;