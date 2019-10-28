import React from "react";
import classes from "./LoginForm.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import classNames from "classnames";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmailValid: true,
      isPasswordValid: true,
      errorLogin: false,
      emailFill: "",
      passFill: "",
      authorization: false,
      errorMassage: ""
    };
  }

  handleInputEmail = event => {
    const patternMail = /.+@.+\..+/i;
    const emailFill = event.target.value;
    this.setState({
      isEmailValid: patternMail.test(emailFill),
      emailFill: emailFill
    });
  };

  handleInputPassword = event => {
    const passFill = event.target.value;
    this.setState({
      passFill: passFill
    });
  };

  login = async ({ email, password }) => {
    const response = await fetch(
      "https://us-central1-mercdev-academy.cloudfunctions.net/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({ email, password })
      }
    );

    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      throw new Error(result.error);
    }
  };

  hideLoginError = () => {
    this.setState({
      errorLogin: false
    });
  };

  tryLogin = async event => {
    event.preventDefault();
    const email = this.state.emailFill;
    const password = this.state.passFill;
    this.hideLoginError();

    try {
      const user = await this.login({ email, password });
      this.setState({
        isEmailValid: true,
        isPasswordValid: true,
        authorization: true
      });
      if (this.state.authorization) {
        this.props.setUserData(user);
      }
    } catch (error) {
      this.setState({
        isEmailValid: false,
        isPasswordValid: false,
        errorLogin: true,
        errorMassage: error.message
      });
    }
  };

  render() {
    let formClassNames = classNames([classes["form"]], this.props.className);
    const { errorMassage, errorLogin } = this.state;

    return (
      <form className={formClassNames} onSubmit={this.tryLogin}>
        <h1 className={[classes["title"]]}>Log In</h1>

        <Input
          className={classes["email"]}
          name="email"
          placeholder="E-Mail"
          onChange={this.handleInputEmail}
          type="text"
          valid={this.state.isEmailValid}
        />

        <Input
          className={classes["password"]}
          name="password"
          placeholder="Password"
          onChange={this.handleInputPassword}
          type="password"
          valid={this.state.isPasswordValid}
        />

        {errorLogin ? (
          <div className={[classes["error"]]}>{errorMassage}</div>
        ) : null}

        <Button className={[classes["submit"]]}>Login</Button>
      </form>
    );
  }
}

export default LoginForm;
