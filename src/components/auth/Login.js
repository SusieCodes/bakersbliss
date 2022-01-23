import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../images/small-logo.png";

export const Login = ({ setAuthUser }) => {
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
        history.push("/dashboard");
      } else {
        setExistDialog(true);
      }
    });
  };

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

      <div className="login-flex">
        <form className="form-login" onSubmit={handleLogin}>
          <div className="logo-wrapper">
            <img className="logo" src={logo} alt="Baker's Bliss" />
          </div>

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
          </fieldset>
        </form>
      </div>
      <div className="link-register">
        <Link to="/register">Register for an account</Link>
      </div>
    </main>
  );
};
