import React from "react";
import classes from "./LoginForm.module.scss";

class LoginForm extends React.Component {
  state = {
    validMail: true,
    inputPass: false,
    errorEmptyInput: false,
    errorSendRespons: false,
    emailFill: "",
    passFill: "",
    errorResolt: "",
    resultPhoto: "",
    resultName: "",
    authorization: false
  };

  /**
  Начало отслеживания полей формы    
*/

  handleInputEmail = event => {
    const patternMail = /.+@.+\..+/i;
    const emailFill = event.target.value;

    this.setState({
      validMail: patternMail.test(emailFill),
      emailFill: emailFill,
      ErrorEmptyInput: emailFill.length === 0
    });
  };

  handleInputPass = event => {
    const passFill = event.target.value;
    this.setState({
      inputPass: passFill.length > 0,
      passFill: passFill,
      errorEmptyInput: passFill.length === 0
    });
  };

  /**
  Конец отслеживания полей формы    
*/

  /**
  Начало функция для отправки данных из формы
*/
  send = async data => {
    let response = await fetch(
      "https://us-central1-mercdev-academy.cloudfunctions.net/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(data)
      }
    );

    let result = await response.json();
    let errorResolt = result.error;
    let resultPhoto = result.photoUrl;
    let resultName = result.name;

    this.setState({
      errorResolt: errorResolt,
      resultPhoto: resultPhoto,
      resultName: resultName
    });

    if (this.state.errorResolt) {
      this.setState({
        errorSendRespons: true
      });
    }
    if (this.state.resultPhoto && this.state.resultName) {
      this.setState({
        authorization: true
      });
    }
  };
  /**
  Конец функции отправки данных из формы    
*/
  /**
    Начало обработки кнопки отправки формы
*/
  submitData = () => {
    this.ifShowError();
    const { emailFill, passFill } = this.state;
    if (emailFill.length > 0 && passFill.length > 0) {
      const logData = {
        email: emailFill,
        password: passFill
      };
      this.send(logData);
    }
  };
  /**
  Конец кнопки отправки данных    
*/
  /**
    Начало функции если одно из полей не заполненно  
*/
  ifShowError = () => {
    const { emailFill, passFill } = this.state;
    if (!emailFill || !passFill) {
      this.setState({
        errorEmptyInput: true,
        errorSendRespons: false
      });
    }
    if (this.state.errorEmptyInput) {
      this.setState({
        errorEmptyInput: false
      });
    }
  };
  /**
    Конец функции если одно из полей не заполненно  
*/

  /**
    Функция выхода из авторизованного окна
*/
  logOut = () => {
    return window.location.reload();
  };
  /**
    ---  
*/

  render() {
    const inputEmailClass = [classes["form-log-in__input"]];
    if (!this.state.validMail) {
      inputEmailClass.push(classes["input-validator-error"]);
    }
    console.log(inputEmailClass);

    let {
      errorEmptyInput,
      errorSendRespons,
      authorization,
      resultPhoto,
      resultName
    } = this.state;

    return (
      <div>
        {/* Начало общего контейнера */}

        {/* Начало блока 'авторизованного пользователя' */}
        {authorization ? (
          <div className={classes["log-in-box-result"]}>
            <div className={classes["persone-photo"]}>
              <img
                className={classes["persone-photo__img"]}
                src={resultPhoto}
                alt={resultName}
              />
            </div>
            <h1 className={classes["persone-name"]}>{resultName}</h1>
            <button className={classes["button-logout"]} onClick={this.logOut}>
              Logout
            </button>
          </div>
        ) : (
          /**
              Конец блока 'авторизованного пользователя'
          */
          /**
              Начало формы авторизации
          */
          <div
            className={[
              classes["log-in-box"],
              classes["log-in-box_layout"]
            ].join(" ")}
          >
            <h1 className={classes["log-in-box__h1"]}>Log In</h1>

            <form id="form-log-in" className={classes["form-log-in"]}>
              <input
                className={inputEmailClass.join(" ")}
                type="text"
                name="email"
                placeholder="E-Mail"
                onChange={this.handleInputEmail}
              />

              <input
                className={classes["form-log-in__input"]}
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleInputPass}
              />

              {errorEmptyInput ? (
                <div className={classes["log-in-error-message"]}>
                  Email and password must be filled
                </div>
              ) : null}

              {errorSendRespons ? (
                <div className={classes["log-in-error-message"]}>
                  {this.state.errorResolt}
                </div>
              ) : null}

              <button
                className={classes["form-log-in__button"]}
                onClick={this.submitData}
                type="button"
              >
                Login
              </button>
            </form>
          </div>
          /**
              Начало формы авторизации
          */
        )}
        {/* Конец общего контейнера */}
      </div>
    );
  }
}

export default LoginForm;
