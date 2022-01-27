//Author: Susie Stanley
//Purpose: Creates and displays individual recipe cards for a single recipe that is passed as a prop

import React from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { changeFave } from "./RecipeManager";
import photo from "../../images/purplepic.png";

export const RecipeCard = ({ recipe }) => {
  // const history = useHistory();

  const handleFave = (e) => {
    changeFave(recipe.id, e.target.checked);
  };

  return (
    <>
      <div className="recipe-card">
        <Link to={`/recipes/${recipe?.id}`}>
          <div className="recipe-image">
            {recipe?.image ? (
              <img
                src={recipe?.image}
                alt={recipe?.name}
                className="recipe-photo"
              />
            ) : (
              <img src={photo} alt="default-dessert" className="recipe-photo" />
            )}
          </div>
        </Link>
        <div className="name-fave-wrapper">
          <Link to={`/recipes/${recipe?.id}`}>
            <div className="recipe-name">{recipe?.name}</div>
          </Link>
          <div className="recipe-fave">
            <Checkbox
              color="error"
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              defaultChecked={recipe.isFave}
              onChange={(e) => handleFave(e)}
            />
          </div>
        </div>
        <Link to={`/recipes/${recipe?.id}`}>
          <div className="recipe-stars">Rating: {recipe?.stars}</div>
          <div className="recipe-description">{recipe?.description}</div>
        </Link>
      </div>
    </>
  );
};
