import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../images/small-logo.png";

export const Register = ({ setAuthUser }) => {
  const [registerUser, setRegisterUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    image: "",
    last_visit: Date.now(),
  });
  const [conflictDialog, setConflictDialog] = useState(false);

  const history = useHistory();

  const handleInputChange = (event) => {
    const newUser = { ...registerUser };
    newUser[event.target.id] = event.target.value;
    setRegisterUser(newUser);
  };

  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/users?email==${registerUser.email}`)
      .then((res) => res.json())
      .then((user) => !!user.length);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    existingUserCheck().then((userExists) => {
      if (!userExists) {
        fetch("http://localhost:8088/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: registerUser.first_name,
            last_name: registerUser.last_name,
            email: registerUser.email,
            image: registerUser.image,
            last_visit: Date.now(),
          }),
        })
          .then((res) => res.json())
          .then((createdUser) => {
            if (createdUser.hasOwnProperty("id")) {
              setAuthUser(createdUser);
              history.push("/dashboard");
            }
          });
      } else {
        setConflictDialog(true);
      }
    });
  };

  return (
    <main className="container-login">
      <dialog className="dialog dialog-password" open={conflictDialog}>
        <div className="dialog-login-content">
          An account with that email address already exists
        </div>
        <button
          className="login-button-close"
          onClick={(e) => setConflictDialog(false)}
        >
          Close
        </button>
      </dialog>

      {/* <div className="outer-wrapper"> */}
      <div className="register-flex">
        <form className="form-login" onSubmit={handleRegister}>
          <div className="form-register__headline">Please Register</div>
          <div className="logo-register">
            <img src={logo} width="300" alt="Baker's Bliss" />
          </div>
          <fieldset>
            <div className="register-wrapper">
              <div className="register-name">
                <label htmlFor="first_name">First Name:</label>

                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  placeholder="First Name"
                  required
                  autoFocus
                  value={registerUser.first_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="register-name">
                <label htmlFor="last_name">Last Name:</label>

                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  placeholder="Last Name"
                  required
                  value={registerUser.last_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="register-name">
                <label htmlFor="inputEmail">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@email.com"
                  required
                  value={registerUser.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-btns">
              <button type="submit">Register</button>

              <button type="button" onClick={() => history.push(`/`)}>
                Cancel
              </button>
            </div>
          </fieldset>
        </form>
        {/* </div> */}
      </div>
    </main>
  );
};
