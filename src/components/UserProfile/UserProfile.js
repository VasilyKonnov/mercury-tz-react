import React from "react";
import classes from "./UserProfile.module.css";
import Button from "../Button/Button";
import classNames from "classnames";

function UserProfile(props) {
  let userClassNames = classNames([classes["user"]], props.className);

  function logOut() {
    return window.location.reload();
  }

  return (
    <div className={userClassNames}>
      <img
        className={[classes["avatar"]]}
        alt={props.user.name ? "photo " + props.user.name : "photo user"}
        src={props.user.photoUrl}
      />
      <h1 className={[classes["name"]]}>{props.user.name}</h1>
      <Button className={[classes["logout"]]} onClick={logOut}>
        Logout
      </Button>
    </div>
  );
}

export default UserProfile;
