import React, { useState } from "react";
import { ApplicationViews } from "./ApplicationViews";
import "./App.scss";

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("bb_user") !== null
  );

  const setAuthUser = (user) => {
    localStorage.setItem("bb_user", user.id);
    localStorage.setItem("bb_username", user.first_name);
    setIsAuthenticated(localStorage.getItem("bb_user") !== null);
  };

  const clearUser = () => {
    localStorage.clear();
    setIsAuthenticated(localStorage.getItem("bb_user") !== null);
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
