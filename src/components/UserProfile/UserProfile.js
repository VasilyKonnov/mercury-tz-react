import React from "react";
import classes from "./UserProfile.module.css";
import Button from "../Button/Button";
import cx from "classnames";

function UserProfile(props) {
  let classNames = cx([classes["user-profile"]], props.className);

  function logOut() {
    return window.location.reload();
  }

  return (
    <div className={classNames}>
      <img
        className={[classes["user-profile__avatar"]]}
        alt={props.alt}
        src={props.src}
      />
      <h1 className={[classes["user-profile__name"]]}>{props.userName}</h1>
      <Button className={[classes["user-profile__logout"]]} onClick={logOut}>
        Logout
      </Button>
    </div>
  );
}

export default UserProfile;
