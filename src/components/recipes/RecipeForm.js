//Author: Susie Stanley
//Purpose: Creates and displays an input form for user to add a recipe

import React, { useState } from "react";
import { useHistory } from "react-router";
import { addRecipe } from "./RecipeManager";
import { WelcomeBar2 } from "../nav/WelcomeBar2";

export const RecipeForm = () => {
  const [conflictDialog, setConflictDialog] = useState(false);
  // Defining initial state of the form inputs with useState
  const [recipe, setRecipe] = useState({
    userId: parseInt(sessionStorage.getItem("bb_user")),
    name: "",
    description: "",
    instructions: "",
    isFave: false,
    stars: "",
    servings: "",
    date: Date.now(),
  });

  const history = useHistory();

  // start of upload function
  const [clickedStyle, setClickedStyle] = useState("no-uploaded-image");
  const [image, setImage] = useState("");
  const [uploadName, setUploadName] = useState("Choose Image");
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

  const ResetForm = () => {
    setClickedStyle("no-uploaded-image");
    setUploadName("Choose Image");
    setImage("");
    setLoading(false);
    setRecipe({
      userId: parseInt(sessionStorage.getItem("bb_user")),
      name: "",
      description: "",
      instructions: "",
      isFave: false,
      stars: "",
      servings: "",
      date: Date.now(),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleControlledInputChange = (evt) => {
    const newRecipe = { ...recipe };
    let selectedVal = evt.target.value;
    newRecipe[evt.target.id] = selectedVal;
    setRecipe(newRecipe);
  };

  const handleSave = (evt) => {
    evt.preventDefault(); //Prevents the browser from submitting the form
    if (recipe.name === "") {
      setConflictDialog(true);
    } else {
      const newRecipe = {
        userId: parseInt(sessionStorage.getItem("bb_user")),
        name: recipe.name,
        description: recipe.description,
        instructions: recipe.instructions,
        isFave: recipe.isFave,
        stars: recipe.stars,
        servings: recipe.servings,
        date: Date.now(),
      };
      addRecipe(newRecipe).then(() => history.push("/recipes"));
    }
  };

  return (
    <>
      <div className="add-edit-recipe">
        <WelcomeBar2 title="Add New recipe" />

        <div className="recipe-form">
          <fieldset>
            <dialog open={conflictDialog}>
              <div className="dialog-recipe">Please Input A Recipe Name</div>
              <button
                className="button-close"
                onClick={(e) => setConflictDialog(false)}
              >
                Close
              </button>
            </dialog>

            <div className="form-group">
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id="name"
                maxLength="20"
                required
                autoFocus
                onChange={handleControlledInputChange}
                className="form-group__edit"
                placeholder=" Recipe Name"
                value={recipe.name}
              />
            </div>

            <div className="upload-section">
              <div className="upload-wrapper">
                <div className="upload-image-text">Image: </div>
                <input
                  type="file"
                  id="image"
                  name={uploadName}
                  className="upload-input"
                  placeholder="Choose Image"
                  onChange={uploadImage}
                />
              </div>
              <div className="uploaded-image-section">
                {loading ? (
                  <div className="loading">Loading...</div>
                ) : (
                  <div className="uploaded-image-wrapper">
                    <img
                      src={image}
                      alt=""
                      width="150"
                      className={clickedStyle}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name">Description: </label>
              <input
                type="text"
                id="description"
                maxLength="120"
                required
                onChange={handleControlledInputChange}
                className="form-group__edit"
                placeholder="Max 120 characters"
                value={recipe.description}
              />
            </div>

            {/* <div className="form-group">
              <div className="measurement-wrapper">
                <label htmlFor="zodiac">Measurement: </label>
                <select
                  name="measurement"
                  id="measurement"
                  className="measurement-options"
                  onChange={handleControlledInputChange}
                  value={recipe?.measurement}
                > */}
            {/* <option className="measurement-placeholder" value="">
                    Choose...
                  </option>
                  <option value="Aries">Aries</option>
                  <option value="Taurus">Taurus</option>
                  <option value="Gemini">Gemini</option>
                  <option value="Cancer">Cancer</option>
                  <option value="Leo">Leo</option>
                  <option value="Virgo">Virgo</option>
                  <option value="Libra">Libra</option>
                  <option value="Scorpio">Scorpio</option>
                  <option value="Sagittarius">Sagittarius</option>
                  <option value="Capricorn">Capricorn</option>
                  <option value="Aquarius">Aquarius</option>
                  <option value="Pisces">Pisces</option> */}
            {/* </select> */}
            {/* </div>
            </div> */}
          </fieldset>

          <div className="form-btns">
            <button type="button" className="form-btn" onClick={handleSave}>
              Submit
            </button>

            <button type="button" className="form-btn" onClick={ResetForm}>
              Reset Form
            </button>

            <button
              type="button"
              className="form-btn"
              onClick={() => history.push("/recipes")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
