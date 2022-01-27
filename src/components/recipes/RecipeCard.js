//Author: Susie Stanley
//Purpose: Creates and displays individual recipe cards for a single recipe that is passed as a prop

import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { changeFave } from "./RecipeManager";

export const RecipeCard = ({ recipe, handleDelete }) => {
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/recipes/${recipe?.id}/edit`);
  };

  const handleFave = (e) => {
    changeFave(recipe.id, e.target.checked);
  };

  return (
    <>
      <div className="recipe-card">
        <div className="recipe-image">
          {recipe?.image ? (
            <img
              src={recipe?.image}
              alt={recipe?.name}
              className="recipe-photo"
            />
          ) : (
            <img
              src={require(`../../images/default.png`).default}
              alt="default-dessert"
              className="recipe-photo"
            />
          )}
        </div>
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
        <div className="recipe-stars">{recipe?.stars}</div>
        <div className="recipe-name">{recipe?.description}</div>
      </div>
    </>
  );
};
