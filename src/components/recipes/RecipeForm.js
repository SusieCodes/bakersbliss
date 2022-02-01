//Author: Susie Stanley
//Purpose: Creates and displays an input form for user to add a recipe

import React, { useState } from "react";
import { useHistory } from "react-router";
// import { IngredientCard } from "../recipes/Cards";
import {
  addRecipe,
  // addIngredient
} from "./RecipeManager";
import { WelcomeBar2 } from "../nav/WelcomeBar2";

export const RecipeForm = () => {
  const [conflictDialog, setConflictDialog] = useState(false);
  const [count, setCount] = useState(0);
  const [ingredients, setIngredients] = useState([{}]);
  const [ingredient, setIngredient] = useState({
    recipeId: 1000,
    label: "",
    amount: "",
    measurementId: 100,
  });

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
    // single ingredient
    setIngredient({
      recipeId: 1000,
      label: "",
      amount: "",
      measurementId: 100,
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
    console.log("newIngredient while typing is: ", newIngredient);
  };

  const handleSaveRecipe = (evt) => {
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
      // ADD CODE THAT ADDS AN ARRAY OF INGREDIENTS TO DATABASE

      // addRecipe(newRecipe).then((recipeObj) => {
      // Promise.all(
      //   ingredients.map((singleIngred) => {
      //     singleIngred.recipeId = recipeObj.id;
      //     return addIngredient(singleIngred);
      //   })
      // ).then(() => history.push("/category/1"));
    }
  };

  const handleSaveIngredientToList = (evt) => {
    evt.preventDefault(); //Prevents the browser from submitting the form
    const newIngredientList = { ...ingredients };

    console.log("newIngredientList after SAVE button ", newIngredientList);

    // console.log("ingredient after SAVE is ", ingredient);
    // setIngredients(newIngredientList);

    // if (
    //   ingredient.label === "" ||
    //   ingredient.amount === "" ||
    //   ingredient.measurementId === ""
    // ) {
    //   setConflictDialog(true);
    // } else {
    newIngredientList[count].label = ingredient.label;
    newIngredientList[count].amount = ingredient.amount;
    newIngredientList[count].measurementId = ingredient.measurementId;

    // const newIngredientList = [];
    // newIngredientList.push(ingredient);

    console.log(`ingredients[${count}].label is `, ingredients[count]?.label);
    console.log(`ingredients[${count}].amount is `, ingredients[count]?.amount);
    console.log(
      `ingredients[${count}].measurement is `,
      ingredients[count]?.measurementId
    );
    console.log(
      `ingredients[${count}].recipeId is `,
      ingredients[count]?.recipeId
    );
    console.log(`ingredients[${count}] object is `, ingredients[count]);

    setIngredient({
      recipeId: 1000,
      label: "",
      amount: "",
      measurementId: 100,
    });

    setCount(count + 1);
    console.log("count is ", count);
    // }
  };

  // addIngredient(newIngredient);
  // .then(() => history.push("/category/1"));
  // }
  // };

  // useEffect(() => {

  // }, []);

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
          <div className="display">
            <div className="blue">
              Ingredient is:
              {/* <div>recipeId: {ingredient?.recipeId}</div> */}
              <div>label: {ingredient?.label}</div>
              <div>amount: {ingredient?.amount}</div>
              <div>measurementId: {ingredient?.measurementId}</div>
            </div>
            <div className="pink">
              Ingredient List is:
              {/* <div>recipeId: {ingredients[count - 1]?.recipeId}</div> */}
              <div>label: {ingredients[count - 1]?.label}</div>
              <div>amount: {ingredients[count - 1]?.amount}</div>
              <div>measurementId: {ingredients[count - 1]?.measurementId}</div>
            </div>
            <div>Count is: {count}</div>
          </div>
          {/* <div className="ingredients-displayed">
            {ingredients[0]
              ? ingredients.map((ingred) => (
                  <div className="ingredient-info">
                    ❉{" "}
                    <span>
                      {ingred.amount} {ingred.measurement.name} {ingred.label}
                    </span>
                  </div>
                ))
              : ""}
          </div> */}
          <fieldset>
            <div className="ingredients-wrapper">
              Ingredients:
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
                  id="measurementId"
                  required
                  onChange={handleIngredientChange}
                  className="form-group__edit"
                  value={ingredient.measurementId}
                >
                  <option value="1">tsp</option>
                  <option value="2">tbsp</option>
                  <option value="3">cup</option>
                  <option value="4">cups</option>
                  <option value="5">pinch</option>
                  <option value="6">dash</option>
                  <option value="7">pint</option>
                  <option value="8">quart</option>
                  <option value="9">stick</option>
                  <option value="10">box</option>
                  <option value="11">can</option>
                  <option value="12">oz</option>
                  <option value="13">liter</option>
                  <option value="14">ml</option>
                  <option value="15">grams</option>
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
