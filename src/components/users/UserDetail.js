import React, { useState, useEffect } from "react";
import { getUserById } from "./UserManager";
import { useParams, useHistory } from "react-router-dom";
import { dateFormatWithSuffix } from "../../helper";
import { WelcomeBar2 } from "../nav/WelcomeBar2";

export const UserDetail = () => {
  const [user, setUser] = useState({
    userId: localStorage.getItem("bb_user"),
    first_name: "",
    last_name: "",
    image: "",
    email: "",
    last_visit: "",
  });

  const { userId } = useParams();
  const history = useHistory();

  const goBack = () => {
    history.goBack();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEdit = () => {
    history.push(`/users/${userId}/edit`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    //use getuserById() from userManager to grab info  and set it to state
    getUserById(userId).then((userInfo) => {
      setUser({
        userId: localStorage.getItem("bb_user"),
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        image: userInfo.image,
        email: userInfo.email,
        last_visit: userInfo.last_visit,
      });
    });
  }, [userId]);

  return (
    <>
      <div className="user-detail">
        <WelcomeBar2 title="Your Account Details" />

        <div className="user-wrapper">
          <div className="user-flex">
            <div className="user-name">
              {user.first_name} {user.last_name}
            </div>
            <div className="user-detail-image">
              {user.image ? (
                <img src={user.image} alt={user.name} />
              ) : (
                <img src={require(`../../images/default.png`)} alt="default" />
              )}
            </div>

            <div className="user-info">
              <div className="user-text">
                Email:
                <span> {user.email}</span>
              </div>
              <div className="user-text">
                Last Visit:
                <span> {dateFormatWithSuffix(user.last_visit)}</span>
              </div>
            </div>

            <div className="btn-wrapper">
              <div className="form-btns">
                <button className="form-btn" onClick={handleEdit}>
                  Edit
                </button>

                <button className="form-btn" onClick={goBack}>
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
