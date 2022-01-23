import React, { useState } from "react";
import { ApplicationViews } from "./ApplicationViews";
import "./App.scss";

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("bb_user") !== null
  );

  const setAuthUser = (user) => {
    sessionStorage.setItem("bb_user", user.id);
    const [firstname] = user.name.split(" ");
    sessionStorage.setItem("bb_username", firstname);
    setIsAuthenticated(sessionStorage.getItem("bb_user") !== null);
  };

  const clearUser = () => {
    sessionStorage.clear();
    setIsAuthenticated(sessionStorage.getItem("bb_user") !== null);
  };

  return (
    <>
      <ApplicationViews
        setAuthUser={setAuthUser}
        isAuthenticated={isAuthenticated}
        clearUser={clearUser}
      />
    </>
  );
}
export default App;
