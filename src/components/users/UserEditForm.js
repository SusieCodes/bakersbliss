//Author: Susie Stanley
//Purpose: Creates and displays form for user to edit an their account

import React, { useState, useEffect } from "react";
import { update, getUserById } from "./UserManager";
import { useParams, useHistory } from "react-router-dom";
import { WelcomeBar2 } from "../nav/WelcomeBar2";
import { Input } from "../../Input";

export const UserEditForm = () => {
  const [user, setUser] = useState({
    userId: parseInt(localStorage.getItem("bb_user")),
    first_name: "",
    last_name: "",
    email: "",
    image: "",
    last_visit: Date.now(),
  });

  const [conflictDialog, setConflictDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = useParams();
  const history = useHistory();

  // start of upload function
  const [clickedStyle, setClickedStyle] = useState("no-uploaded-image");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async (evt) => {
    const files = evt.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "wp84lxqy");
    setLoading(true);

    const res = await fetch(
      "	https://api.cloudinary.com/v1_1/dllowdq2w/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    setImage(file.secure_url);
    setLoading(false);
    setClickedStyle("uploaded-image");
  };
  // end of upload function

  const handleFieldChange = (evt) => {
    const stateToChange = { ...user };
    stateToChange[evt.target.id] = evt.target.value;
    setUser(stateToChange);
  };

  const updateExistingUser = (evt) => {
    evt.preventDefault();
    setIsLoading(true);

    // This is an edit, so we need the info
    const editedUser = {
      id: userId,
      first_name: user.first_name,
      last_name: user.last_name,
      image: image ? image : user.image,
      email: user.email,
      last_visit: Date.now(),
    };

    if (user.first_name === "") {
      setConflictDialog(true);
      setIsLoading(false);
    } else {
      update(editedUser).then(() => {
        history.goBack();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  };

  useEffect(() => {
    getUserById(userId).then((user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, [userId]); //wont cause infinite loop because it comes from params

  return (
    <>
      <div className="user-detail">
        <WelcomeBar2 title="Edit Your Account Details" />

        <div className="user-edit-wrapper">
          <div className="user-edit-flex">
            <fieldset className="form">
              <dialog className="dialog" open={conflictDialog}>
                <div className="dialog-forms">
                  Please make sure name is filled in
                </div>
                <button
                  className="button-close"
                  onClick={(e) => setConflictDialog(false)}
                >
                  Close
                </button>
              </dialog>
              <div className="user-detail-image">
                {user.image ? (
                  <img src={user.image} alt={user.first_name} />
                ) : (
                  <img
                    src={require(`../../images/default.png`)}
                    alt="default"
                    className="user-detail-photo"
                  />
                )}
              </div>

              <div className="upload-section">
                <div className="upload-wrapper">
                  <div className="upload-image-text">Image: </div>
                  <input
                    type="file"
                    id="image"
                    name="file"
                    className="upload-input"
                    placeholder="Choose Image"
                    onChange={uploadImage}
                  />
                </div>
              </div>

              <div className="uploaded-image-section">
                {loading ? (
                  <div className="loading">Loading...</div>
                ) : (
                  <div className="uploaded-image-wrapper">
                    {image ? (
                      <img
                        src={image}
                        alt={user.first_name}
                        width="150"
                        height="150"
                        className={`${clickedStyle}`}
                      />
                    ) : null}
                  </div>
                )}
              </div>

              <Input
                id="first_name"
                required
                value={user?.first_name}
                onChange={handleFieldChange}
                label="First Name: "
              />

              <Input
                id="last_name"
                required
                value={user?.last_name}
                onChange={handleFieldChange}
                label="Last Name: "
              />

              <Input
                id="email"
                value={user?.email}
                onChange={handleFieldChange}
                label="Email: "
              />
            </fieldset>

            <div className="form-btns">
              <button
                type="button"
                disabled={isLoading}
                className="form-btn"
                onClick={updateExistingUser}
              >
                Submit
              </button>

              <button
                type="button"
                className="form-btn"
                onClick={() => {
                  history.goBack();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
