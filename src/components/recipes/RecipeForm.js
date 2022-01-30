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
    categoryId: 1,
    description: "",
    instructions: "",
    isFave: false,
    stars: "☆☆☆☆☆",
    prep: "",
    cook: "",
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
      categoryId: 1,
      description: "",
      instructions: "",
      isFave: false,
      stars: "☆☆☆☆☆",
      prep: "",
      cook: "",
      servings: "",
      date: Date.now(),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFieldChange = (evt) => {
    const newRecipe = { ...recipe };
    newRecipe[evt.target.id] = evt.target.value;
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
        categoryId: recipe.categoryId,
        description: recipe.description,
        instructions: recipe.instructions,
        isFave: recipe.isFave,
        stars: recipe.stars,
        prep: recipe.prep,
        cook: recipe.cook,
        servings: recipe.servings,
        date: Date.now(),
      };
      addRecipe(newRecipe).then(() => history.push("/category/1"));
    }
  };

  return (
    <>
      <div className="add-edit-recipe">
        <WelcomeBar2 title="Add New Recipe" />

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
                onChange={handleFieldChange}
                className="form-group__edit"
                placeholder=" Recipe Name"
                // value={recipe?.name}
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

            <div className="form-group-cat">
              <label htmlFor="categoryId">Category: </label>
              <select
                name="categoryId"
                id="categoryId"
                required
                onChange={handleFieldChange}
                className="form-group__edit"
                value={recipe?.categoryId}
              >
                <option value="cup">Cookies</option>
                <option value="cups">Cake</option>
                <option value="tbsp">Cupcakes</option>
                <option value="tsp">Muffins</option>
                <option value="cup">Brownies</option>
                <option value="cups">Bars</option>
                <option value="tbsp">Holidays</option>
                <option value="tsp">Breads</option>
                <option value="tbsp">Pies</option>
                <option value="tsp">Frosting</option>
                <option value="cup">Candy</option>
                <option value="cups">Donuts</option>
                <option value="tbsp">Rolls</option>
                <option value="tsp">Other</option>
              </select>
            </div>

            <div className="form-group-stars">
              <label for="stars">Select # of Stars: </label>
              <select
                name="stars"
                id="stars"
                required
                className="star-options"
                onChange={handleFieldChange}
                value={recipe?.stars}
              >
                <option value="☆☆☆☆☆" selected="selected">
                  ☆☆☆☆☆
                </option>
                <option value="★">★</option>
                <option value="★★">★★</option>
                <option value="★★★">★★★</option>
                <option value="★★★★">★★★★</option>
                <option value="★★★★★">★★★★★</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="name">Description: </label>
              <textarea
                name="description"
                id="description"
                maxLength="1500"
                required
                cols="24"
                rows="4"
                onChange={handleFieldChange}
                className="form-group__edit"
                placeholder=" Enter recipe instructions"
                // value={recipe?.description}
              />
            </div>

            <div className="form-group-row">
              <label htmlFor="prep">
                Prep Time: <small>(mins)</small>
              </label>
              <input
                type="text"
                id="prep"
                maxLength="3"
                required
                onChange={handleFieldChange}
                className="form-group__edit"
                value={recipe.prep}
              />
              <label htmlFor="cook">
                Cook time: <small>(mins)</small>
              </label>
              <input
                type="text"
                id="cook"
                maxLength="3"
                required
                onChange={handleFieldChange}
                classcook="form-group__edit"
                // value={recipe?.cook}
              />
            </div>
            <div className="form-group-row">
              <label htmlFor="servings">Servings: </label>
              <input
                type="text"
                id="servings"
                maxLength="3"
                required
                onChange={handleFieldChange}
                className="form-group__edit"
                // value={recipe?.servings}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="ingredients-wrapper">
              Ingredients:
              <div className="ingredients-group">
                <input
                  type="text"
                  id="amount"
                  maxLength="8"
                  required
                  onChange={handleFieldChange}
                  className="form-group__edit"
                  placeholder="  #"
                  // value={ingredient.amount}
                />
                <select
                  name="measurement"
                  id="measurement"
                  required
                  onChange={handleFieldChange}
                  className="form-group__edit"
                  // value={ingredient.measurement}
                >
                  {/* <option className="measurement-placeholder" value="" disabled>
                    cups
                  </option> */}
                  <option value="cup">cup</option>
                  <option value="cups">cups</option>
                  <option value="tbsp">tbsp</option>
                  <option value="tsp">tsp</option>
                  <option value="cup">pinch</option>
                  <option value="cups">dash</option>
                  <option value="tbsp">pint</option>
                  <option value="tsp">quart</option>
                </select>
                <input
                  type="text"
                  id="ingredient-name"
                  maxLength="20"
                  required
                  onChange={handleFieldChange}
                  className="form-group__edit"
                  placeholder=" ingredient name"
                  // value={ingredient.name}
                />
              </div>
              <div className="ingredients-group">
                <input
                  type="text"
                  id="amount"
                  maxLength="8"
                  required
                  onChange={handleFieldChange}
                  className="form-group__edit"
                  placeholder="  #"
                  // value={ingredient.amount}
                />
                <select
                  name="measurement"
                  id="measurement"
                  required
                  onChange={handleFieldChange}
                  className="form-group__edit"
                  // value={ingredient.measurement}
                >
                  {/* <option className="measurement-placeholder" value="" disabled>
                    cups
                  </option> */}
                  <option value="cup">cup</option>
                  <option value="cups">cups</option>
                  <option value="tbsp">tbsp</option>
                  <option value="tsp">tsp</option>
                  <option value="cup">pinch</option>
                  <option value="cups">dash</option>
                  <option value="tbsp">pint</option>
                  <option value="tsp">quart</option>
                </select>
                <input
                  type="text"
                  id="ingredient-name"
                  maxLength="20"
                  required
                  onChange={handleFieldChange}
                  className="form-group__edit"
                  placeholder=" ingredient name"
                  // value={ingredient.name}
                />
              </div>
              <div className="ingredients-group">
                <input
                  type="text"
                  id="amount"
                  maxLength="8"
                  required
                  onChange={handleFieldChange}
                  className="form-group__edit"
                  placeholder="  #"
                  // value={ingredient.amount}
                />
                <select
                  name="measurement"
                  id="measurement"
                  required
                  onChange={handleFieldChange}
                  className="form-group__edit"
                  // value={ingredient.measurement}
                >
                  {/* <option className="measurement-placeholder" value="" disabled>
                    cups
                  </option> */}
                  <option value="cup">cup</option>
                  <option value="cups">cups</option>
                  <option value="tbsp">tbsp</option>
                  <option value="tsp">tsp</option>
                  <option value="cup">pinch</option>
                  <option value="cups">dash</option>
                  <option value="tbsp">pint</option>
                  <option value="tsp">quart</option>
                </select>
                <input
                  type="text"
                  id="ingredient-name"
                  maxLength="20"
                  required
                  onChange={handleFieldChange}
                  className="form-group__edit"
                  placeholder=" ingredient name"
                  // value={ingredient.name}
                />
              </div>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="instructions">Instructions: </label>
              <textarea
                name="instructions"
                id="instructions"
                maxLength="2000"
                required
                cols="24"
                rows="4"
                onChange={handleFieldChange}
                className="form-group__edit"
                placeholder=" Enter recipe instructions"
                // value={recipe?.instructions}
              />
            </div>
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
              onClick={() => history.push("/category/1")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
