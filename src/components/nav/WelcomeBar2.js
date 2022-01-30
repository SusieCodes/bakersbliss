import React from "react";
import { useHistory } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

//WelcomeBar2 displays back button, title & date without displaying username again
export const WelcomeBar2 = (props) => {
  const history = useHistory();
  const { title } = props;

  return (
    <div className="welcome-flex">
      <div className="welcome-left">
        <span className="welcome-back" onClick={() => history.goBack()}>
          <IoArrowBack /> Back
        </span>
      </div>

      <div className="welcome-title">{title}</div>

      <div className="welcome-right"></div>
    </div>
  );
};
