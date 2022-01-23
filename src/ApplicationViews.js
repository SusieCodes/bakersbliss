import { Route } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { TopNav } from "./components/nav/TopNav";
import { Dashboard } from "./components/dashboard/Dashboard";

export const ApplicationViews = ({
  setAuthUser,
  isAuthenticated,
  clearUser,
}) => {
  return (
    <>
      <Route path="/">
        {isAuthenticated ? <TopNav clearUser={clearUser} /> : null}
      </Route>

      <Route exact path="/">
        <Login setAuthUser={setAuthUser} />
      </Route>

      <Route exact path="/register">
        <Register setAuthUser={setAuthUser} />
      </Route>

      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
    </>
  );
};
