//Author: Susie Stanley
//Purpose: Creates and displays form for user to edit an existing Recipe

import React, { useState, useEffect } from "react";
import { updateRecipe, getRecipeById } from "../recipes/RecipeManager";
import { useParams, useHistory } from "react-router-dom";
import { WelcomeBar2 } from "../nav/WelcomeBar2";

export const RecipeEditForm = () => {
  // Defining initial state of the form inputs with useState()
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
    userId: parseInt(sessionStorage.getItem("bb_user")),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [conflictDialog, setConflictDialog] = useState(false);

  const { recipeId } = useParams();
  const history = useHistory();

  const handleFieldChange = (evt) => {
    const editedRecipe = { ...recipe };
    editedRecipe[evt.target.id] = evt.target.value;
    setRecipe(editedRecipe);
  };

  const updateExistingRecipe = (evt) => {
    evt.preventDefault();

    // This is an edit, so we need the id
    const editedRecipe = {
      userId: parseInt(sessionStorage.getItem("bb_user")),
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
      updateRecipe(editedRecipe).then(() => history.push("/category/1"));
    }
  };

  useEffect(() => {
    getRecipeById(recipeId).then((recipe) => {
      setRecipe(recipe);
      setIsLoading(false);
      console.log("stars is ", recipe?.stars);
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

            <div className="form-group">
              <label htmlFor="description">Description: </label>
              <input
                type="text"
                id="description"
                maxLength="120"
                required
                className="form-group__edit"
                onChange={handleFieldChange}
                value={recipe?.description}
              />
            </div>
            <div className="form-group">
              <label htmlFor="instructions">Instructions: </label>
              <input
                type="text"
                id="instructions"
                maxLength="500"
                required
                className="form-group__edit"
                onChange={handleFieldChange}
                value={recipe?.instructions}
              />
            </div>
            <div className="star-wrapper">
              <label htmlFor="stars">Select # of Stars: </label>
              <select
                name="stars"
                id="stars"
                className="star-options"
                onChange={handleFieldChange}
                value={recipe?.stars}
              >
                <option value={recipe?.stars}>{recipe?.stars}</option>
                <option value="★☆☆☆☆">★☆☆☆☆</option>
                <option value="★★☆☆☆">★★☆☆☆</option>
                <option value="★★★☆☆">★★★☆☆</option>
                <option value="★★★★☆">★★★★☆</option>
                <option value="★★★★★">★★★★★</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="servings">Servings: </label>
              <input
                type="text"
                id="servings"
                maxLength="2"
                className="form-group__edit"
                onChange={handleFieldChange}
                value={recipe?.servings}
              />
            </div>
          </fieldset>

          <fieldset>
            <div className="form-group">
              <label htmlFor="notes">Notes: </label>
              <textarea
                name="notes"
                id="notes"
                maxLength="1000"
                required
                cols="24"
                rows="4"
                onChange={handleFieldChange}
                className="form-group__edit"
                placeholder=" Enter recipe notes"
                value={recipe?.notes}
              />
            </div>
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
