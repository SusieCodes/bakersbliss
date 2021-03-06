import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { logVisit } from "../recipes/RecipeManager";

export const Login = ({ setAuthUser, clearUser }) => {
  const [loginUser, setLoginUser] = useState({ email: "" });
  const [existDialog, setExistDialog] = useState(false);

  const history = useHistory();

  const handleInputChange = (event) => {
    const newUser = { ...loginUser };
    newUser[event.target.id] = event.target.value;
    setLoginUser(newUser);
  };

  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/users?email=${loginUser.email}`)
      .then((res) => res.json())
      .then((user) => (user.length ? user[0] : false));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    existingUserCheck().then((exists) => {
      if (exists) {
        setAuthUser(exists);
        logVisit(exists.id, Date.now());
        history.push("/dashboard");
      } else {
        setExistDialog(true);
      }
    });
  };

  useEffect(() => {
    clearUser();
  }, []);

  return (
    <main className="container-login">
      <dialog className="dialog dialog-auth" open={existDialog}>
        <div className="login-dialog">User does not exist</div>
        <button
          className="login-button-close"
          onClick={(e) => setExistDialog(false)}
        >
          Close
        </button>
      </dialog>
      <div className="outer-wrapper">
        <div className="login-flex">
          <form className="form-login" onSubmit={handleLogin}>
            <fieldset className="login-fieldset">
              <div className="login-wrapper">
                <label htmlFor="inputEmail" className="login-label">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-group__edit"
                  placeholder="name@email.com"
                  required
                  autoFocus
                  value={loginUser.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-btns">
                <button type="submit" className="login-btn">
                  Sign In
                </button>
              </div>
              <div className="link-register">
                <Link to="/register">Register for an account</Link>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </main>
  );
};
