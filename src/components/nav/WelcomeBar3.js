import React from "react";

//WelcomeBar3 displays title only
export const WelcomeBar3 = (props) => {
  const { title } = props;

  return (
    <div className="welcome-flex">
      <div className="welcome-left"></div>

      <div className="welcome-title">{title}</div>

      <div className="welcome-right"></div>
    </div>
  );
};
