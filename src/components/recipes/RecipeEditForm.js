//Author: Susie Stanley
//Purpose: Creates and displays form for user to edit an existing Recipe

import React, { useState, useEffect } from "react";
import {
  updateRecipe,
  getRecipeById,
  getImagesByRecipeId,
  getAllNotes,
  getIngredientsByRecipeId,
  getNotesByRecipeId,
  getMeasurements,
  deleteIngredient,
  deleteNote,
  addImage,
  addIngredient,
  addNote,
} from "../recipes/RecipeManager";
import { EditIngredientCard, EditNoteCard } from "../recipes/Cards";

import { useParams, useHistory } from "react-router-dom";
import { WelcomeBar2 } from "../nav/WelcomeBar2";

export const RecipeEditForm = () => {
  const { recipeId } = useParams();
  const history = useHistory();

  const [images, setImages] = useState([]);
  const [note, setNote] = useState({
    recipeId: parseInt(recipeId),
    text: "",
    date: Date.now(),
  });
  const [notes, setNotes] = useState({});
  const [measurements, setMeasurements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conflictDialog, setConflictDialog] = useState(false);
  const [ingredient, setIngredient] = useState({
    recipeId: recipeId,
    label: "",
    amount: "",
    measurement: "",
  });
  const [ingredients, setIngredients] = useState([]);
  const [newIngredients, setNewIngredients] = useState([]);
  const [recipe, setRecipe] = useState({
    name: "",
    categoryId: 1,
    description: "",
    instructions: "",
    isFave: false,
    ratingId: "",
    prep: "",
    cook: "",
    servings: 1,
    date: Date.now(),
    userId: parseInt(localStorage.getItem("bb_user")),
  });

  const hundred = 100;

  // start of upload function
  const [clickedStyle, setClickedStyle] = useState("no-uploaded-image");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({
    recipeId: parseInt(recipeId),
    image_path: "",
  });

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
    const newImageObj = {};
    newImageObj.recipeId = parseInt(recipeId);
    newImageObj.image_path = file.secure_url;
    addImage(newImageObj);
    setImage(newImageObj);
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

  const handleNewNoteChange = (evt) => {
    console.log();
    const editedNote = { ...note };
    editedNote[evt.target.id] = evt.target.value;
    setNote(editedNote);
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

  const addNewNote = (noteObj) => {
    console.log("noteObj inside addNewNote is :", noteObj);
    if (noteObj.text !== "") {
      console.log("it is making inside the conditional");
      addNote(noteObj);
    }
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
      ratingId: parseInt(recipe?.ratingId),
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
      updateRecipe(editedRecipe)
        .then(() => {
          let noteObj = { ...note };
          const newIngredArray = newIngredients.map((ingredObj) => {
            ingredObj.recipeId = parseInt(recipeId);
            return ingredObj;
          });
          let allInfoObj = {
            newIngredArray,
            noteObj,
          };
          return allInfoObj;
        })
        .then(({ newIngredArray, noteObj }) => {
          console.log("noteObj before promise is ", noteObj);
          Promise.all([
            newIngredArray.map((ingredientObj) => {
              addIngredient(ingredientObj);
            }),
            addNewNote(note),
          ]).then(() => {
            history.goBack();
            window.scrollTo({ top: 0, behavior: "smooth" });
          });
        });
    }
  };

  // deletes ingredient when icon clicked
  const handleDeleteIngred = (ingredientId) => {
    deleteIngredient(ingredientId).then(() => {
      getIngredientsByRecipeId(recipeId).then((ingredientsFromAPI) => {
        setIngredients(ingredientsFromAPI);
      });
    });
  };

  // deletes ingredient when icon clicked
  const handleDeleteNote = (noteId) => {
    deleteNote(noteId).then(() => {
      getNotesByRecipeId(recipeId).then((notesFromAPI) => {
        setNotes(notesFromAPI);
      });
    });
  };

  useEffect(() => {
    getRecipeById(recipeId).then((recipe) => {
      setRecipe(recipe);
      setIsLoading(false);
      getImagesByRecipeId(recipeId).then((imagesFromAPI) => {
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
              {images[0] && images[0].image_path !== "" ? (
                <img src={images[0]?.image_path} alt={recipe?.name} />
              ) : (
                <img
                  src={require(`../../images/defaultcupcake.png`)}
                  alt="cupcake default"
                />
              )}
            </div>

            <div className="form-group-name">
              <label htmlFor="name">Name: </label>{" "}
              <input
                type="text"
                id="name"
                maxLength="20"
                required
                autoFocus
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
                      src={image?.image_path}
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
              <label htmlFor="ratingId">Select # of Stars: </label>
              <select
                name="ratingId"
                id="ratingId"
                className="star-options"
                onChange={handleFieldChange}
                value={recipe?.ratingId}
              >
                <option value="1">☆☆☆☆☆</option>
                <option value="2">★☆☆☆☆</option>
                <option value="3">★★☆☆☆</option>
                <option value="4">★★★☆☆</option>
                <option value="5">★★★★☆</option>
                <option value="6">★★★★★</option>
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
              <div className="prep-input">
                <label htmlFor="prep">
                  Prep Time: <small>(mins)</small>
                </label>
                <input
                  type="text"
                  id="prep"
                  maxLength="3"
                  required
                  onChange={handleFieldChange}
                  value={recipe.prep}
                />
              </div>
              <div className="cook-input">
                <label htmlFor="cook">
                  Cook time: <small>(mins)</small>
                </label>
                <input
                  type="text"
                  id="cook"
                  maxLength="3"
                  required
                  onChange={handleFieldChange}
                  value={recipe.cook}
                />
              </div>
            </div>
            <div className="form-group-row">
              <label htmlFor="servings">Servings: </label>
              <input
                type="text"
                id="servings"
                maxLength="3"
                required
                onChange={handleFieldChange}
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
                        handleDeleteIngred={handleDeleteIngred}
                      />
                    ))
                  : ""}
                {newIngredients[0]
                  ? newIngredients.map((ingred, index) => (
                      <EditIngredientCard
                        key={index + hundred}
                        ingred={ingred}
                        handleDeleteIngred={handleDeleteIngred}
                      />
                    ))
                  : ""}
              </div>
              <div className="ingredients-edit-group">
                <div className="add-ingredient">Add An Ingredient:</div>
                <div className="ingred-input-wrapper">
                  <input
                    type="text"
                    id="amount"
                    maxLength="3"
                    required
                    onChange={handleIngredientChange}
                    placeholder=" #"
                    value={ingredient?.amount}
                  />
                  <select
                    name="measurement"
                    id="measurement"
                    required
                    onChange={handleIngredientChange}
                    value={ingredient?.measurement}
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
                    placeholder=" ingredient name"
                    value={ingredient.label}
                  />
                  <span
                    className="add-ingred-btn"
                    onClick={handleSaveIngredientToList}
                  >
                    Save
                  </span>
                </div>
                <div className="save-text">Press SAVE after each entry</div>
              </div>
            </div>
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

            {/* <div className="notes-header">Notes:</div> */}
            {notes[0] ? (
              <div className="form-group-notes">
                Notes:
                {notes.map((singleNote) => (
                  <EditNoteCard
                    key={singleNote.id}
                    singleNote={singleNote}
                    handleDeleteNote={handleDeleteNote}
                  />
                ))}
                <label htmlFor="note">Add New Note: </label>
                <textarea
                  name="note"
                  id="text"
                  maxLength="500"
                  cols="42"
                  rows="4"
                  onChange={handleNewNoteChange}
                  placeholder=" Enter notes"
                  value={note?.text}
                />
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
