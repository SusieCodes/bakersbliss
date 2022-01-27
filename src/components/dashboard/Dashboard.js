// Purpose: To display user relevant info when first logging in

import React from "react";
// import { Link } from "react-router-dom";
// import { WelcomeBar } from "../nav/WelcomeBar";
import { Sidebar } from "../nav/Sidebar";
// import { PrimaryBtn } from "../buttons/Buttons";
// import { SecondaryBtn } from "../buttons/Buttons";

export const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
        <Sidebar />
      </div>
    </>
  );
};
