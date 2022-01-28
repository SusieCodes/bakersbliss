import React, { useState, useEffect } from "react";
import { getCookieRecipesByUserId } from "../recipes/RecipeManager";
import { RecipeCard } from "../recipes/RecipeCard";
import { RecipeDummyCard } from "../recipes/RecipeDummyCard";
import { WelcomeBar } from "../nav/WelcomeBar";

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
      {" "}
      <div className="cookie-recipes">
        <WelcomeBar title="Cookie Recipes" />
        <div className="recipe-container">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </>
  );
};
