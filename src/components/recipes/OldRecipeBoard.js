//Author: Susie Stanley
//Purpose: Displays all user's recipes

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRecipesByUserId } from "./RecipeManager";
import { RecipeCard } from "./RecipeCard";
import { RecipeDummyCard } from "./RecipeDummyCard";
import { WelcomeBar2 } from "../nav/WelcomeBar2";

export const RecipeBoard = (category) => {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    getRecipesByCategory(sessionStorage.getItem("bb_user"), category).then(
      (recipesFromAPI) => {
        setRecipes(recipesFromAPI);
      }
    );
  };

  //gets the user's recipes sorted by favorites and sets it to state
  const getRecipesByFave = () => {
    getRecipesByUserId(sessionStorage.getItem("bb_user")).then(
      (recipesFromAPI) => {
        recipesFromAPI.sort(function (a, b) {
          return b.isFave - a.isFave;
        });
        setRecipes(recipesFromAPI);
      }
    );
  };

  //gets the user's recipes sorted by category and sets it to state
  const getRecipesByCategory = () => {
    getRecipesByUserId(sessionStorage.getItem("bb_user")).then(
      (recipesFromAPI) => {
        //add code to sort from join table info (recipeCategory)
        setRecipes(recipesFromAPI);
      }
    );
  };
  //gets the user's recipes sorted by rating and sets it to state
  const getRecipesByStars = () => {
    getRecipesByUserId(sessionStorage.getItem("bb_user")).then(
      (recipesFromAPI) => {
        recipesFromAPI.sort(function (a, b) {
          return b - a;
        });
        setRecipes(recipesFromAPI);
      }
    );
  };
  // sort all user's recipes by name and set it to state
  const getRecipesByName = () => {
    getRecipesByUserId(sessionStorage.getItem("bb_user")).then(
      (recipesFromAPI) => {
        recipesFromAPI.sort((a, b) => a.name.localeCompare(b.name));
        setRecipes(recipesFromAPI);
      }
    );
  };

  useEffect(() => {
    getRecipes();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="recipe-board">
        <WelcomeBar2 title="Your Recipes" />

        <div className="recipe-header">
          <div className="recipe-create">
            <Link to={`/recipes/create`}>
              <button className="add-recipe">+ Add recipe</button>
            </Link>
          </div>

          {/* ternary statement that shows recipe cards if they exist and message if none exist yet */}
          {recipes[0] ? (
            <div className="recipes-container">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="dummy-container">
              <RecipeDummyCard />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
