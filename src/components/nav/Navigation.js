import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserById } from "../users/UserManager";
import * as AiIcons from "react-icons/ai";
import * as Io5Icons from "react-icons/io5";
import * as FaIcons from "react-icons/fa";
import logo from "../../images/logo2.png";

export const Navigation = ({ clearUser }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    image: "",
    id: 1,
  });

  const getUser = () => {
    getUserById(localStorage.getItem("bb_user")).then((currentUser) =>
      setUser(currentUser)
    );
  };

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
          {localStorage.getItem("bb_user") ? (
            <>
              <div className="avatar-wrapper">
                <Link to={`/users/${localStorage.getItem("bb_user")}`}>
                  {user?.image ? (
                    <img src={user?.image} alt={user?.name} />
                  ) : (
                    <img
                      src={require(`../../images/default.png`)}
                      alt="default-user"
                      className="avatar-photo"
                    />
                  )}
                </Link>
              </div>
              <Link
                to="/"
                title="logout"
                onClick={() => {
                  clearUser();
                }}
              >
                <button className="logout">Logout</button>
              </Link>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* start of side menu */}
      <div className="side-menu">
        <ul className="side-menu-items">
          <Link to="/dashboard">
            <li title="Home">
              <AiIcons.AiFillHome />
            </li>
          </Link>
          <Link to={`/users/${user.id}`}>
            <li title="User Info">
              <FaIcons.FaUserCircle />
            </li>
          </Link>
          <Link to="/shopping">
            <li title="Shopping List">
              <FaIcons.FaListUl />
            </li>
          </Link>
          <Link to="/">
            <li title="LogOut">
              <Io5Icons.IoLogOut />
            </li>
          </Link>
        </ul>
      </div>
      {/* end of side menu */}
    </>
  );
};
