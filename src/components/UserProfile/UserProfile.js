import React from "react";
import classes from "./UserProfile.module.css";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

function UserProfile(props) {
  const propsClasses = props.className ? props.className.join(" ") : "";
  const classNames = [classes["user-profile"], [propsClasses]].join(" ");

  console.log(props);

  function logOut() {
    console.log("функция логаут из UserProfile");
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
      <ButtonComponent
        className={[classes["user-profile__logout"]]}
        onClick={logOut}
      >
        Logout
      </ButtonComponent>
    </div>
  );
}

export default UserProfile;
