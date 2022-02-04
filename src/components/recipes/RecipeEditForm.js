//Author: Susie Stanley
//Purpose: Creates and displays form for user to edit an existing Recipe

import React, { useState, useEffect } from "react";
import {
  updateRecipe,
  getRecipeById,
  getAllImages,
  getAllNotes,
  getIngredientsByRecipeId,
  getMeasurements,
  deleteIngredient,
  addImage,
  addIngredient,
} from "../recipes/RecipeManager";
import { EditIngredientCard } from "../recipes/Cards";
import { formatDateFromIntStr } from "../../helper";
import { useParams, useHistory } from "react-router-dom";
import { WelcomeBar2 } from "../nav/WelcomeBar2";

export const RecipeEditForm = () => {
  const { recipeId } = useParams();
  const history = useHistory();

  const [images, setImages] = useState([]);
  const [notes, setNotes] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conflictDialog, setConflictDialog] = useState(false);
  const [ingredient, setIngredient] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [newIngredients, setNewIngredients] = useState([]);
  const [recipe, setRecipe] = useState({
    name: "",
    categoryId: 1,
    description: "",
    instructions: "",
    isFave: false,
    stars: "",
    prep: "",
    cook: "",
    servings: 1,
    date: Date.now(),
    userId: parseInt(localStorage.getItem("bb_user")),
  });

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
    const editedRecipe = { ...recipe };
    editedRecipe[evt.target.id] = evt.target.value;
    setRecipe(editedRecipe);
  };

  const handleIngredientChange = (evt) => {
    const editedIngred = { ...ingredient };
    editedIngred[evt.target.id] = evt.target.value;
    setIngredient(editedIngred);
  };

  const handleNoteChange = (evt) => {
    const editedNotes = [...notes];
    editedNotes[evt.target.id].text = evt.target.value;
    setNotes(editedNotes);
  };

  const handleSaveIngredientToList = (evt) => {
    evt.preventDefault(); //Prevents the browser from submitting the form
    const newIngredientList = [...newIngredients];
    newIngredientList.push(ingredient);
    setNewIngredients(newIngredientList);

    setIngredient({
      label: "",
      amount: "",
      measurement: "",
    });
  };

  const updateExistingRecipe = (evt) => {
    evt.preventDefault(); //Prevents the browser from submitting the form

    // This is an edit, so we need the id
    const editedRecipe = {
      userId: parseInt(localStorage.getItem("bb_user")),
      name: recipe?.name,
      categoryId: recipe?.categoryId,
      description: recipe?.description,
      instructions: recipe?.instructions,
      isFave: recipe?.isFave,
      stars: recipe?.stars,
      prep: recipe?.prep,
      cook: recipe?.cook,
      servings: recipe?.servings,
      date: Date.now(),
      id: recipeId,
    };

    if (
      recipe.name === "" ||
      recipe.category === 1 ||
      recipe.description === "" ||
      recipe.instructions === "" ||
      recipe.prep === "" ||
      recipe.cook === "" ||
      recipe.servings === ""
    ) {
      setConflictDialog(true);
    } else {
      // let newIngredients = [];
      updateRecipe(editedRecipe)
        .then(() => {
          const NewIngredArray = newIngredients.map((ingredObj) => {
            console.log("ingredObj is ", ingredObj);
            ingredObj.recipeId = parseInt(recipeId);
            return ingredObj;
          });
          let imageObj = {};
          imageObj.image_path = image;
          imageObj.recipeId = parseInt(recipeId);
          let allInfoObj = {
            NewIngredArray,
            imageObj,
          };
          return allInfoObj;
        })
        .then(({ NewIngredArray, imageObj }) => {
          console.log(
            "NewIngredArray & imageObj are ",
            NewIngredArray,
            imageObj
          );
          Promise.all([
            NewIngredArray.map((ingredientObj) => {
              addIngredient(ingredientObj);
            }),
            addImage(imageObj),
          ]).then(() => {
            history.push("/category/1");
          });
        });
    }
  };

  // deletes ingredient when icon clicked
  const handleDelete = (ingredientId) => {
    deleteIngredient(ingredientId).then(() => {
      getIngredientsByRecipeId(recipeId).then((ingredientsFromAPI) => {
        setIngredients(ingredientsFromAPI);
      });
    });
  };

  useEffect(() => {
    getRecipeById(recipeId).then((recipe) => {
      setRecipe(recipe);
      setIsLoading(false);
      getAllImages(recipeId).then((imagesFromAPI) => {
        setImages(imagesFromAPI);
      });
      getAllNotes(recipeId).then((notesFromAPI) => {
        setNotes(notesFromAPI);
      });
      getIngredientsByRecipeId(recipeId).then((ingredientsFromAPI) => {
        setIngredients(ingredientsFromAPI);
      });
      getMeasurements().then((measurementsFromAPI) => {
        setMeasurements(measurementsFromAPI);
      });
    });
  }, [recipeId]);

  return (
    <>
      <div className="add-edit-recipe">
        <WelcomeBar2 title="Edit Recipe" />

        <div className="recipe-form">
          <fieldset>
            <dialog open={conflictDialog}>
              <div className="dialog-recipe">
                Please make sure all fields are filled
              </div>
              <button
                className="button-close"
                onClick={(e) => setConflictDialog(false)}
              >
                Close
              </button>
            </dialog>

            <div className="recipe-detail-image">
              {images[0] ? (
                <img src={images[0]?.image_path} alt={recipe.name} />
              ) : (
                <img
                  src={require(`../../images/default.png`)}
                  alt="default"
                  className="recipe-detail-photo"
                />
              )}
            </div>

            <div className="form-group">
              <label htmlFor="name">Name: </label>{" "}
              <input
                type="text"
                id="name"
                maxLength="25"
                required
                autoFocus
                className="form-group__edit"
                onChange={handleFieldChange}
                value={recipe?.name}
              />
            </div>

            <div className="upload-section">
              <div className="upload-wrapper">
                <div className="upload-image-text">Image: </div>
                <input
                  type="file"
                  id="image"
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

            <div className="form-group-description">
              <label htmlFor="description">Description: </label>
              <textarea
                name="description"
                id="description"
                maxLength="1000"
                required
                cols="42"
                rows="4"
                onChange={handleFieldChange}
                className="form-group__edit"
                placeholder=" Enter description"
                value={recipe?.description}
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
                  ? ingredients.map((ingred) => (
                      <EditIngredientCard
                        key={ingred.id}
                        ingred={ingred}
                        handleDelete={handleDelete}
                      />
                    ))
                  : ""}
                {newIngredients[0]
                  ? newIngredients.map((ingred) => (
                      <EditIngredientCard
                        key={ingred.id}
                        ingred={ingred}
                        handleDelete={handleDelete}
                      />
                    ))
                  : ""}
              </div>
              <div className="ingredients-group">
                <div className="add-ingredent">Add An Ingredient:</div>
                <input
                  type="text"
                  id="amount"
                  maxLength="3"
                  required
                  onChange={handleIngredientChange}
                  className="form-group__edit"
                  placeholder=" #"
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

            {/* {ingredients[0] ? (
              <div className="form-group-ingredients">
                {ingredients.map((singleIngred, index) => (
                  <div className="edit-ingredients" key={index}>
                    <div className="ingredient-date">
                      {formatDateFromIntStr(singleIngred.date)}
                    </div>
                    <textarea
                      name="ingredient"
                      id={index}
                      maxLength="500"
                      required
                      cols="24"
                      rows="2"
                      onChange={handleingredientChange}
                      placeholder=" Enter recipe singleingredients"
                      value={singleingredient.text}
                      // ASK BRENDA value={ingredients[singleingredient.id].text}
                    />
                  </div>
                ))}
              </div>
            ) : (
              ""
            )} */}
          </fieldset>

          <fieldset>
            <div className="form-group-instructions">
              <label htmlFor="instructions">Instructions: </label>
              <textarea
                name="instructions"
                id="instructions"
                maxLength="1000"
                required
                cols="42"
                rows="4"
                onChange={handleFieldChange}
                className="form-group__edit"
                placeholder=" Enter instructions"
                value={recipe?.instructions}
              />
            </div>
            {/* </fieldset>

          <fieldset> */}
            <div className="notes-header">Notes:</div>
            {notes[0] ? (
              <div className="form-group-notes">
                {notes.map((singleNote, index) => (
                  <div className="edit-notes" key={index}>
                    <div className="note-date">
                      {formatDateFromIntStr(singleNote.date)}
                    </div>
                    <textarea
                      name="note"
                      id={index}
                      maxLength="500"
                      required
                      cols="24"
                      rows="2"
                      onChange={handleNoteChange}
                      placeholder=" Enter recipe singleNotes"
                      value={singleNote.text}
                      // ASK BRENDA value={notes[singleNote.id].text}
                    />
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </fieldset>

          <div className="form-btns">
            <button
              type="button"
              disabled={isLoading}
              onClick={updateExistingRecipe}
              className="form-btn"
            >
              Submit
            </button>

            <button
              type="button"
              onClick={() => history.push(`/category/1`)}
              className="form-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
