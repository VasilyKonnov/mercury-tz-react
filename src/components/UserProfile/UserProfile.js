import React from "react";
import classes from "./UserProfile.module.css";
import Button from "../Button/Button";
import cx from "classnames";

function UserProfile(props) {
  let classNames = cx([classes["user"]], props.className);

  function logOut() {
    return window.location.reload();
  }

  return (
    <div className={classNames}>
      <img
        className={[classes["user__avatar"]]}
        alt={props.altAvatar}
        src={props.srcAvatar}
      />
      <h1 className={[classes["user__name"]]}>{props.userName}</h1>
      <Button className={[classes["user__logout"]]} onClick={logOut}>
        Logout
      </Button>
    </div>
  );
}

export default UserProfile;
