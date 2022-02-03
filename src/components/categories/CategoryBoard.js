//Author: Susie Stanley
//Purpose: Displays all user's recipes based on category

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getRecipesByCategory,
  getRecipesByUserId,
  getCategoryById,
} from "../recipes/RecipeManager";
import { RecipeCard } from "../recipes/RecipeCard";
import { RecipeDummyCard } from "../recipes/RecipeDummyCard";
import { WelcomeBar2 } from "../nav/WelcomeBar2";

export const CategoryBoard = () => {
  const [recipes, setRecipes] = useState([]);
  const [name, setName] = useState([]);

  const { categoryId } = useParams();

  //gets the user's recipes sorted by category and sets it to state
  const getRecipes = () => {
    if (categoryId > 1) {
      getRecipesByCategory(localStorage.getItem("bb_user"), categoryId).then(
        (recipesFromAPI) => {
          setRecipes(recipesFromAPI);
        }
      );
    } else {
      getRecipesByUserId(localStorage.getItem("bb_user")).then(
        (recipesFromAPI) => {
          setRecipes(recipesFromAPI);
        }
      );
    }
  };

  const getName = (categoryId) => {
    getCategoryById(categoryId).then((category) => {
      setName(category.name);
    });
  };

  useEffect(() => {
    getRecipes();
    getName(categoryId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="recipe-board">
        <WelcomeBar2 title={name} />

        <div className="recipe-create">
          <Link to={`/recipes/create`}>
            <button className="add-recipe">Add recipe</button>
          </Link>
        </div>

        {/* ternary statement that shows recipe cards if they exist and dummy card if none exist yet */}
        {recipes[0] ? (
          <div className="recipes-container">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="recipes-container">
            <RecipeDummyCard />
          </div>
        )}
      </div>
    </>
  );
};
