import React from "react";
import classes from "./LoginForm.module.css";
import classesAppContainer from "../AppContainer/AppContainer.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import UserProfile from "../UserProfile/UserProfile";
import cx from "classnames";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validEmail: true,
      validPassword: true,
      inputPass: false,
      errorLogin: false,
      emailFill: "",
      passFill: "",
      errorResolt: "",
      loginResult: "",
      userProfilePhoto: "",
      userProfileName: "",
      authorization: false,
      errorMassage: ""
    };
  }

  handleInputEmail = event => {
    const patternMail = /.+@.+\..+/i;
    const emailFill = event.target.value;
    this.setState({
      validEmail: patternMail.test(emailFill),
      emailFill: emailFill
    });
  };

  handleInputPassword = event => {
    const passFill = event.target.value;
    this.setState({
      inputPass: passFill.length > 0,
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
        validEmail: true,
        validPassword: true,
        userProfilePhoto: user.photoUrl,
        userProfileName: user.name,
        authorization: true
      });
    } catch (error) {
      this.setState({
        validEmail: false,
        validPassword: false,
        errorLogin: true,
        errorMassage: error.message
      });
    }
  };

  render() {
    let classNames = cx([classes["form"]], this.props.className);

    const {
      errorMassage,
      errorLogin,
      authorization,
      userProfileName,
      userProfilePhoto
    } = this.state;

    return (
      <React.Fragment>
        {!authorization ? (
          <form className={classNames} onSubmit={this.tryLogin}>
            <h1 className={[classes["form__title"]]}>Log In</h1>

            <Input
              className={classes["form__email"]}
              name="email"
              placeholder="E-Mail"
              onChange={this.handleInputEmail}
              type="text"
              valid={this.state.validEmail ? "true" : null}
            />

            <Input
              className={classes["form__password"]}
              name="password"
              placeholder="Password"
              onChange={this.handleInputPassword}
              type="password"
              valid={this.state.validPassword ? "true" : null}
            />

            {errorLogin ? (
              <div className={[classes["form__error"]]}>{errorMassage}</div>
            ) : null}

            <Button className={[classes["form__submit"]]}>Login</Button>
          </form>
        ) : (
          <UserProfile
            className={[classesAppContainer["app__body"], "panel"]}
            userName={userProfileName}
            alt={userProfileName}
            src={userProfilePhoto}
            type="button"
          />
        )}
      </React.Fragment>
    );
  }
}

export default LoginForm;
