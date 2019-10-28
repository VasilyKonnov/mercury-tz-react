import React from "react";
import "./App.module.css";
import AppContainer from "./components/AppContainer/AppContainer";
import classesAppContainer from "./components/AppContainer/AppContainer.module.css";
import Logo from "./components/Logo/Logo";
import LoginForm from "./components/LoginForm/LoginForm";
import UserProfile from "./components/UserProfile/UserProfile";
import classNames from "classnames";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
    this.setUserData = this.setUserData.bind(this);
  }

  setUserData(user) {
    this.setState({
      user: user
    });
  }

  render() {
    const { user } = this.state;
    let UserProfileClassNames = classNames(
      [classesAppContainer["body"]],
      [classesAppContainer["withoutlogo"]]
    );
    return (
      <AppContainer>
        {!user ? (
          <React.Fragment>
            <Logo />
            <LoginForm
              className={[classesAppContainer["body"]]}
              setUserData={this.setUserData}
            />
          </React.Fragment>
        ) : (
          <UserProfile className={UserProfileClassNames} user={user} />
        )}
      </AppContainer>
    );
  }
}

export default App;
