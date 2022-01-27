import React, { useState, useEffect } from "react";
import { getRecipeById, deleteRecipe } from "./RecipeManager";
import { useParams, useHistory } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { changeFave } from "./RecipeManager";

export const RecipeDetail = () => {
  const [notes, setNotes] = useState([]);
  const [recipe, setRecipe] = useState({
    userId: sessionStorage.getItem("bb_user"),
    name: "",
    description: "",
    instructions: "",
    isFave: false,
    stars: 1,
    servings: 1,
  });

  const { recipeId } = useParams();
  const history = useHistory();

  const handleDelete = () => {
    //invokes the delete function from Recipe Manager and re-directs to recipe list
    deleteRecipe(recipeId).then(() => history.push("/recipes"));
  };

  const handleFave = (e) => {
    changeFave(recipeId, e.target.checked);
  };

  // const goBack = () => {
  //   history.push("/recipes");
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  const handleEdit = () => {
    history.push(`/recipes/${recipeId}/edit`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    //use getRecipeById() from RecipeManager to grab info and set it to state when page first loads
    getRecipeById(recipeId).then((recipe) => {
      setRecipe({
        userId: sessionStorage.getItem("bb_user"),
        name: recipe.name,
        description: recipe.description,
        instructions: recipe.instructions,
        isFave: recipe.isFave,
        stars: recipe.stars,
        servings: recipe.servings,
      });
    });
  }, [recipeId]);

  useEffect(() => {
    //use getNotes() from RecipeManager to grab notes and set it to state when page first loads
    getNotesByRecipeId(recipeId).then((notes) => {
      setNotes(notes);
    });
  }, []);

  return (
    <>
      <div className="recipe-detail">
        <div className="recipe-top">
          <div className="recipe-top__col1">
            <div className="recipe-info">
              <div className="name-fave-wrapper">
                <div className="recipe-name">{recipe?.name}</div>
                <div className="checkbox">
                  <Checkbox
                    color="error"
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    defaultChecked={recipe.isFave}
                    onChange={(e) => handleFave(e)}
                  />
                </div>
              </div>
            </div>
            <div className="recipe-info">
              <div className="recipe-prep"></div>
              <div className="btn-list">
                <div className="print-btn" onClick={}>
                  Print
                </div>

                <div
                  className="details-btn"
                  onClick={() => handleEdit(recipe?.id)}
                >
                  Edit
                </div>

                <div
                  className="details-btn"
                  onClick={() => handleDelete(recipe?.id)}
                >
                  Delete
                </div>
              </div>
            </div>
          </div>
          </div>
            <div className="recipe-top__col2">
              <div className="recipe-photo">
                {recipe.image !== "" ? (
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                  />
                ) : (
                  <img
                    src={require(`../../images/default.png`).default}
                    alt="default"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="recipe-middle">
            <h3>Description:</h3>
            <p>{recipe.description}</p>
          </div>

          <div className="recipe-general">
            <div className="row1">
              <h3>Ingredients:</h3>
              <div className="ingredient-list">Ingredient List goes here</div>
            </div>
            
            <div className="row2">
              <h3>Instructions:</h3>
              <p className="instructions">{recipe?.instructions}</p>
            </div>
          </div>
          
{/* ternary statement that shows recipe cards if they exist and message if none exist yet */}
          {notes[0] ? (
            <div className="recipe-notes">
              {notes.map((note) => (
                <NoteCard key={note.id} note={note}/>
              ))}
            </div>
          ) : (
              ""
          )}
    </>
  );
};
