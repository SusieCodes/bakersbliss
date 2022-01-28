import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCookieRecipesByUserId } from "../recipes/RecipeManager";
import { RecipeCard } from "../recipes/RecipeCard";
import { RecipeDummyCard } from "../recipes/RecipeDummyCard";
import { WelcomeBar } from "../nav/WelcomeBar";
import { AddRecipeBtn } from "../buttons/Buttons";

export const Cookies = () => {
  const [recipes, setRecipes] = useState([]);

  // fetch all user's cookie recipes by date and set it to state
  const getCookies = () => {
    getCookieRecipesByUserId(sessionStorage.getItem("bb_user")).then(
      (recipesFromAPI) => {
        setRecipes(recipesFromAPI);
      }
    );
  };

  useEffect(() => {
    getCookies();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="recipe-board">
        <WelcomeBar title="Cookie Recipes" />

        <div className="recipe-create">
          <Link to={`/recipes/create`}>
            <AddRecipeBtn />
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
    </>
  );
};
