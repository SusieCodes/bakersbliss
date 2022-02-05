import React, { useState, useEffect } from "react";
import {
  getRecipeById,
  deleteRecipe,
  changeFave,
  getIngredientsByRecipeId,
} from "./RecipeManager";
import { useParams, useHistory } from "react-router-dom";
import { NoteCard, IngredientCard } from "../recipes/Cards";
import { Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { WelcomeBar2 } from "../nav/WelcomeBar2";
import photo from "../../images/defaultcupcake.png";

export const RecipeDetail = () => {
  const [notes, setNotes] = useState([]);
  const [images, setImages] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState({
    userId: 1,
    name: "",
    categoryId: 1,
    category: [],
    description: "",
    instructions: "",
    isFave: true,
    stars: 1,
    prep: "",
    cook: "",
    servings: 1,
    date: 1,
  });

  const { recipeId } = useParams();
  const history = useHistory();

  const handleDelete = () => {
    //invokes the delete function from Recipe Manager and re-directs to recipe list
    deleteRecipe(recipeId).then(() => history.push("/category/1"));
  };

  const handleFave = (e) => {
    changeFave(recipeId, e.target.checked);
  };

  const handleEdit = () => {
    history.push(`/recipes/${recipeId}/edit`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getRecipe = () => {
    getRecipeById(recipeId).then((recipe) => {
      setRecipe(recipe);
      setImages(recipe.images);
      setNotes(recipe.notes);
    });
  };

  useEffect(() => {
    getRecipe();
    getIngredientsByRecipeId(recipeId).then((ingredientList) => {
      setIngredients(ingredientList);
    });
  }, []);

  return (
    <>
      <div className="recipe-detail">
        <WelcomeBar2 title="Recipe Details" />
        <div className="recipe-wrapper">
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
                <div className="cat-rating-wrapper">
                  <div className="category">
                    Category: <span>{recipe?.category.name}</span>
                  </div>
                  <div className="rating">
                    Rating: <span>{recipe?.stars}</span>
                  </div>
                </div>
              </div>
              <div className="recipe-time">
                <div className="prep-time-wrapper">
                  <div className="prep-text">
                    <div className="prep">Prep time:</div>
                    <div className="cook">Cook time:</div>
                    <div className="total">Total:</div>
                  </div>
                  <div className="prep-times">
                    <div className="prep">
                      {recipe?.prep !== "" ? recipe.prep : 0}mins
                    </div>
                    <div className="cook">
                      {" "}
                      {recipe?.cook !== "" ? recipe.cook : 0}mins
                    </div>
                    <div className="total">
                      {recipe?.prep !== "" && recipe?.cook !== ""
                        ? parseInt(recipe.prep) + parseInt(recipe.cook)
                        : 0}
                      mins
                    </div>
                  </div>
                </div>
                <div className="recipe-prep-info"></div>
                <div className="btn-list">
                  <div
                    className="print-btn"
                    // onClick={}
                  >
                    Print
                  </div>

                  <div
                    className="details-btn middle-btn"
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

            <div className="recipe-top__col2">
              {images[1] ? (
                <div className="recipe-photo__thumbnails">
                  <div className="thumbnail">
                    {images[1] ? (
                      <img src={images[1].image_path} alt={recipe?.name} />
                    ) : (
                      <img src={photo} alt={recipe?.name} />
                    )}
                  </div>
                  <div className="thumbnail middle">
                    {images[2] ? (
                      <img src={images[2].image_path} alt={recipe?.name} />
                    ) : (
                      <img src={photo} alt={recipe?.name} />
                    )}
                  </div>
                  <div className="thumbnail">
                    {images[3] ? (
                      <img src={images[3].image_path} alt={recipe?.name} />
                    ) : (
                      <img src={photo} alt={recipe?.name} />
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="recipe-photo">
                {images[0] ? (
                  <img src={images[0].image_path} alt={recipe?.name} />
                ) : (
                  <img src={photo} alt={recipe?.name} />
                )}
              </div>
            </div>
          </div>

          <div className="recipe-middle">
            <h4>Description:</h4>
            <p>{recipe?.description}</p>
          </div>

          <div className="recipe-general">
            <div className="ingredients">
              <h4>Ingredients:</h4>
              {/* ternary statement that shows ingredients if they exist */}
              {ingredients[0] ? (
                <div className="ingredient-list">
                  {ingredients.map((ingredient) => (
                    <IngredientCard
                      key={ingredient.id}
                      ingredient={ingredient}
                    />
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="instructions">
              <h4>Instructions:</h4>
              <p>{recipe?.instructions}</p>
            </div>

            {/* ternary statement that shows notes if they exist */}
            {notes[0] ? (
              <div className="notes">
                <h4>Notes:</h4>

                {notes.map((note) => (
                  <NoteCard key={note.id} note={note} />
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};
