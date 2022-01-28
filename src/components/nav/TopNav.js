import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getUserById } from "../users/UserManager";
import { LogoutBtn } from "../buttons/Buttons";
import logo from "../../images/small-logo.png";

export const TopNav = ({ clearUser }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    image: "",
    id: 1,
  });

  const getUser = () => {
    getUserById(sessionStorage.getItem("bb_user")).then((currentUser) =>
      setUser(currentUser)
    );
  };

  const history = useHistory();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {/* start of NavBar at top of page */}
      <div className="toolbar">
        <div className="toolbar-left">
          <Link to="/dashboard">
            <img className="logo" src={logo} width="200" alt="Baker's Bliss" />
          </Link>
        </div>
        <div className="toolbar-right">
          {sessionStorage.getItem("bb_user") ? (
            <>
              <div className="avatar-wrapper">
                {user?.image ? (
                  <Link to={`/users/${user?.id}`}>
                    <img src={user?.image} alt={user?.name} />
                  </Link>
                ) : (
                  <img
                    src={require(`../../images/default.png`).default}
                    alt="default-user"
                    className="avatar-photo"
                  />
                )}
              </div>
              <LogoutBtn clearUser={clearUser} />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
