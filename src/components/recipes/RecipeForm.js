//Author: Susie Stanley
//Purpose: Creates and displays an input form for user to add a recipe

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
// import { IngredientCard } from "../recipes/Cards";
import {
  addRecipe,
  getMeasurements,
  addIngredient,
  addImage,
} from "./RecipeManager";
import { WelcomeBar2 } from "../nav/WelcomeBar2";

export const RecipeForm = () => {
  const [conflictDialog, setConflictDialog] = useState(false);
  // const [count, setCount] = useState(0);
  const [measurements, setMeasurements] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState({
    label: "",
    amount: "",
    measurement: "",
  });

  // Defining initial state of the form inputs with useState
  const [recipe, setRecipe] = useState({
    userId: parseInt(localStorage.getItem("bb_user")),
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
  const [image, setImage] = useState({
    recipeId: "",
    image_path: "",
  });
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
    const newImageObj = { ...image };
    newImageObj.image_path = file.secure_url;
    console.log("file.secure.url is: ", file.secure_url);
    setImage(newImageObj);
    setLoading(false);
    setClickedStyle("uploaded-image");
  };
  // end of upload function

  const ResetForm = () => {
    setClickedStyle("no-uploaded-image");
    setUploadName("Choose Image");
    setImage({});
    setLoading(false);
    setRecipe({
      userId: parseInt(localStorage.getItem("bb_user")),
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
    // single ingredient
    setIngredient({
      label: "",
      amount: "",
      measurement: "",
    });
    // ingredient list
    setIngredients([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFieldChange = (evt) => {
    const newRecipe = { ...recipe };
    newRecipe[evt.target.id] = evt.target.value;
    setRecipe(newRecipe);
  };

  const handleIngredientChange = (evt) => {
    const newIngredient = { ...ingredient };
    newIngredient[evt.target.id] = evt.target.value;
    setIngredient(newIngredient);
    // console.log("newIngredient while typing is: ", newIngredient);
  };

  const handleSaveRecipe = (evt) => {
    evt.preventDefault(); //Prevents the browser from submitting the form
    if (recipe.name === "") {
      setConflictDialog(true);
    } else {
      const newRecipe = {
        userId: parseInt(localStorage.getItem("bb_user")),
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

      let newIngredients = [...ingredients];

      addRecipe(newRecipe)
        .then((response) => {
          const newInfo = newIngredients.map((ingredObj) => {
            console.log("ingredObj is ", ingredObj);
            ingredObj.recipeId = response.id;
            return ingredObj;
          });
          let imageObj = { ...image };
          imageObj.recipeId = response.id;
          let allInfoObj = {
            newInfo,
            imageObj,
          };
          return allInfoObj;
        })
        .then(({ newInfo, imageObj }) => {
          console.log("newInfo & imageObj are ", newInfo, imageObj);
          Promise.all([
            newInfo.map((ingredientObj) => {
              addIngredient(ingredientObj);
            }),
            addImage(imageObj),
          ]).then(() => {
            history.push("/category/1");
          });
        });
    }
  };

  const handleSaveIngredientToList = (evt) => {
    evt.preventDefault(); //Prevents the browser from submitting the form
    const newIngredientList = [...ingredients];
    newIngredientList.push(ingredient);
    setIngredients(newIngredientList);

    setIngredient({
      label: "",
      amount: "",
      measurement: "",
    });
  };

  useEffect(() => {
    getMeasurements().then((measurementsFromAPI) => {
      setMeasurements(measurementsFromAPI);
    });
  }, []);

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
                      src={image.image_path}
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
                value={recipe.categoryId}
              >
                <option value="">Choose</option>
                <option value="2">Cookies</option>
                <option value="3">Cake</option>
                <option value="4">Cupcakes</option>
                <option value="5">Muffins</option>
                <option value="6">Brownies</option>
                <option value="7">Bars</option>
                <option value="8">Holidays</option>
                <option value="9">Breads</option>
                <option value="10">Pies</option>
                <option value="11">Frosting</option>
                <option value="12">Candy</option>
                <option value="13">Donuts</option>
                <option value="14">Rolls</option>
                <option value="15">Other</option>
              </select>
            </div>

            <div className="form-group-stars">
              <label htmlFor="stars">Select # of Stars: </label>
              <select
                name="stars"
                id="stars"
                className="star-options"
                onChange={handleFieldChange}
                value={recipe.stars}
              >
                <option value="☆☆☆☆☆">☆☆☆☆☆</option>
                <option value="★☆☆☆☆">★☆☆☆☆</option>
                <option value="★★☆☆☆">★★☆☆☆</option>
                <option value="★★★☆☆">★★★☆☆</option>
                <option value="★★★★☆">★★★★☆</option>
                <option value="★★★★★">★★★★★</option>
              </select>{" "}
              <small>(or leave unrated)</small>
            </div>

            <div className="form-group">
              <label htmlFor="name">Description: </label>
              <textarea
                name="description"
                id="description"
                maxLength="500"
                required
                cols="24"
                rows="4"
                onChange={handleFieldChange}
                className="form-group__edit"
                placeholder=" Give a brief summary up to 500 characters"
                value={recipe.description}
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
                value={recipe.cook}
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
                value={recipe.servings}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="ingredients-wrapper">
              Ingredients:
              <div className="ingredients-displayed">
                {ingredients[0]
                  ? ingredients.map((ingred, index) => (
                      <div key={index} className="ingredient-info">
                        ❉{" "}
                        <span>
                          <small>
                            {ingred.amount} {ingred.measurement} {ingred.label}
                          </small>
                        </span>
                      </div>
                    ))
                  : ""}
              </div>
              <div className="ingredients-group">
                <input
                  type="text"
                  id="amount"
                  maxLength="8"
                  required
                  onChange={handleIngredientChange}
                  className="form-group__edit"
                  placeholder="  #"
                  value={ingredient.amount}
                />
                <select
                  name="measurement"
                  id="measurement"
                  required
                  onChange={handleIngredientChange}
                  className="form-group__edit"
                  value={ingredient.measurement}
                >
                  <option value=""></option>
                  {measurements[0]
                    ? measurements.map((measurement) => (
                        <option key={measurement.id} value={measurement.name}>
                          {measurement.name}
                        </option>
                      ))
                    : ""}
                </select>
                <input
                  type="text"
                  id="label"
                  maxLength="20"
                  required
                  onChange={handleIngredientChange}
                  className="form-group__edit"
                  placeholder=" ingredient name"
                  value={ingredient.label}
                />
                <span
                  className="save-ingred-btn"
                  onClick={handleSaveIngredientToList}
                >
                  Save
                </span>
                <div>Press SAVE after each entry</div>
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
                value={recipe.instructions}
              />
            </div>
          </fieldset>

          <div className="form-btns">
            <button
              type="button"
              className="form-btn"
              onClick={handleSaveRecipe}
            >
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
