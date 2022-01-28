import React from "react";
import { Link } from "react-router-dom";
import { dateFormatWithSuffix } from "../../helper";

//WelcomeBar displays username, title & date (use WelcomeBar2 if back button needed)
export const WelcomeBar = (props) => {
  const userName = sessionStorage.getItem("bb_username");
  const userId = parseInt(sessionStorage.getItem("bb_user"));
  const { title } = props;

  return (
    <div className="welcome-flex">
      <div className="welcome-left">
        Welcome,{" "}
        <span className="welcome-name">
          <Link to={`/users/${userId}`}>{userName}</Link>
        </span>
      </div>

      <div className="welcome-title">{title}</div>

      <div className="welcome-right">{dateFormatWithSuffix(Date.now())}</div>
    </div>
  );
};
