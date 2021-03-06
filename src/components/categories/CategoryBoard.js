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
      setName(category?.name);
    });
  };

  // ***** start of sorting functions *****

  //gets the user's recipes sorted by favorites and sets it to state
  const getRecipesByFave = () => {
    if (categoryId > 1) {
      getRecipesByCategory(localStorage.getItem("bb_user"), categoryId).then(
        (recipesFromAPI) => {
          recipesFromAPI.sort(function (a, b) {
            return b.isFave - a.isFave;
          });
          setRecipes(recipesFromAPI);
        }
      );
    } else {
      getRecipesByUserId(localStorage.getItem("bb_user")).then(
        (recipesFromAPI) => {
          recipesFromAPI.sort(function (a, b) {
            return b.isFave - a.isFave;
          });
          setRecipes(recipesFromAPI);
        }
      );
    }
  };

  //gets the user's recipes sort by name and sets it to state
  const getRecipesByName = () => {
    if (categoryId > 1) {
      getRecipesByCategory(localStorage.getItem("bb_user"), categoryId).then(
        (recipesFromAPI) => {
          let sortByName = recipesFromAPI.sort((a, b) => {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1; //nameA comes first
            }
            if (nameA > nameB) {
              return 1; // nameB comes first
            }
            return 0; // names must be equal
          });
          setRecipes(sortByName);
        }
      );
    } else {
      getRecipesByUserId(localStorage.getItem("bb_user")).then(
        (recipesFromAPI) => {
          let sortByName = recipesFromAPI.sort((a, b) => {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1; //nameA comes first
            }
            if (nameA > nameB) {
              return 1; // nameB comes first
            }
            return 0; // names must be equal
          });
          setRecipes(sortByName);
        }
      );
    }
  };

  //gets the user's recipes sorted by ratings and sets it to state
  const getRecipesByRating = () => {
    if (categoryId > 1) {
      getRecipesByCategory(localStorage.getItem("bb_user"), categoryId)
        .then((recipesFromAPI) => {
          let five = [];
          let four = [];
          let three = [];
          let two = [];
          let one = [];
          let unrated = [];
          let sortByStars = [];
          recipesFromAPI.map((recipe) => {
            if (recipe?.ratingId === 6) {
              five.push(recipe);
            } else if (recipe.ratingId === 5) {
              four.push(recipe);
            } else if (recipe.ratingId === 4) {
              three.push(recipe);
            } else if (recipe.ratingId === 3) {
              two.push(recipe);
            } else if (recipe.ratingId === 2) {
              one.push(recipe);
            } else {
              unrated.push(recipe);
            }
            sortByStars = five.concat(four, three, two, one, unrated);
          });
          return sortByStars;
        })
        .then((sortByStars) => {
          setRecipes(sortByStars);
        });
    } else {
      getRecipesByUserId(localStorage.getItem("bb_user"))
        .then((recipesFromAPI) => {
          let five = [];
          let four = [];
          let three = [];
          let two = [];
          let one = [];
          let unrated = [];
          let sortByStars = [];
          recipesFromAPI.map((recipe) => {
            if (recipe?.ratingId === 6) {
              five.push(recipe);
            } else if (recipe.ratingId === 5) {
              four.push(recipe);
            } else if (recipe.ratingId === 4) {
              three.push(recipe);
            } else if (recipe.ratingId === 3) {
              two.push(recipe);
            } else if (recipe.ratingId === 2) {
              one.push(recipe);
            } else {
              unrated.push(recipe);
            }
            sortByStars = five.concat(four, three, two, one, unrated);
          });
          return sortByStars;
        })
        .then((sortByStars) => {
          setRecipes(sortByStars);
        });
    }
  };

  const getRecipesByDate = () => {
    if (categoryId > 1) {
      getRecipesByCategory(localStorage.getItem("bb_user"), categoryId).then(
        (recipesFromAPI) => {
          setRecipes(recipesFromAPI);
        }
      );
    } else {
      getRecipes();
    }
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
          <div className="recipe-top-spacer"></div>
          <div className="recipe-top-add">
            <Link to={`/recipes/create`}>
              <button className="add-recipe">Add recipe</button>
            </Link>
          </div>

          {/* this begins the sort button section */}
          <div className="recipe-top-sort">
            <div className="sort-wrapper">
              <div
                className="sort pink"
                onClick={() => {
                  getRecipesByName();
                }}
              >
                A-Z
              </div>
              <div
                className="sort blue"
                onClick={() => {
                  getRecipesByRating();
                }}
              >
                Rating
              </div>
              <div
                className="sort purple"
                onClick={() => {
                  getRecipesByFave();
                }}
              >
                Faves
              </div>
              <div
                className="sort green"
                onClick={() => {
                  getRecipesByDate();
                }}
              >
                Newest
              </div>
            </div>
          </div>
        </div>
        {/* end of sort button section*/}

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
