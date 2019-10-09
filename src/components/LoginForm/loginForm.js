import React from "react";
import classes from "./LoginForm.module.css";
import classesInput from "../InputComponent/InputComponent.module.css";
import classesAppContainer from "../AppContainer/AppContainer.module.css";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import UserProfile from "../UserProfile/UserProfile";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validEmail: true,
      inputPass: false,
      errorEmptyInput: false,
      errorLogin: false,
      emailFill: "",
      passFill: "",
      errorResolt: "",
      loginResult: "",
      userProfilePhoto: "",
      userProfileName: "",
      authorization: false,
      errorMassage: "",
      showInputErrors: false
    };
  }

  handleInputEmail = event => {
    const patternMail = /.+@.+\..+/i;
    const emailFill = event.target.value;
    this.setState({
      validEmail: patternMail.test(emailFill),
      emailFill: emailFill,
      ErrorEmptyInput: emailFill.length === 0
    });
  };

  handleInputPassword = event => {
    const passFill = event.target.value;
    this.setState({
      inputPass: passFill.length > 0,
      passFill: passFill,
      errorEmptyInput: passFill.length === 0
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
        userProfilePhoto: user.photoUrl,
        userProfileName: user.name,
        showInputErrors: false,
        authorization: true
      });
    } catch (error) {
      this.setState({
        errorLogin: true,
        errorMassage: error.message,
        showInputErrors: true
      });
    }
  };

  // logOut = () => {
  //   console.log("отработал логаут");
  //   return window.location.reload();
  // };

  // вывод ошибки
  // Начало рендера

  render() {
    const {
      validEmail,
      errorMassage,
      errorLogin,
      showInputErrors,
      authorization,
      userProfileName,
      userProfilePhoto
    } = this.state;

    const inputEmailClasses = [classes["login-form__email"]];
    const inputPasswordClasses = [classes["login-form__password"]];

    if (!validEmail) {
      inputEmailClasses.push(classesInput["text-input--invalid"]);
    }

    if (showInputErrors) {
      inputEmailClasses.push(classesInput["text-input--invalid"]);
      inputPasswordClasses.push(classesInput["text-input--invalid"]);
    }

    const propsClasses = this.props.className
      ? this.props.className.join(" ")
      : "";
    const classNames = [[classes["login-form"]], propsClasses].join(" ");

    return (
      <div>
        {!authorization ? (
          <form className={classNames} onSubmit={this.tryLogin}>
            <h1 className={[classes["login-form__title"]]}>Log In</h1>

            <InputComponent
              className={inputEmailClasses}
              name="email"
              placeholder="E-Mail"
              onChange={this.handleInputEmail}
              type="text"
            />
            <InputComponent
              className={inputPasswordClasses}
              name="password"
              placeholder="Password"
              onChange={this.handleInputPassword}
              type="password"
            />

            {errorLogin ? (
              <div className={[classes["login-form__error"]]}>
                {errorMassage}
              </div>
            ) : null}

            <ButtonComponent className={[classes["login-form__submit"]]}>
              Login
            </ButtonComponent>
          </form>
        ) : (
          <UserProfile
            className={[classesAppContainer["app-container__body"], "panel"]}
            userName={userProfileName}
            alt={userProfileName}
            src={userProfilePhoto}
            type="button"
            // onClick={console.log("Был клик по LogOut")}
            // onClick={this.logOut}
          />
        )}
      </div>
    );
  }
}

export default LoginForm;
