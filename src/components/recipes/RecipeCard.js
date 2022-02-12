//Author: Susie Stanley
//Purpose: Creates and displays individual recipe cards for a single recipe that is passed as a prop

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { changeFave, getImagesByRecipeId } from "./RecipeManager";
import { formatStars } from "../../helper";
import photo from "../../images/defaultcupcake.png";

export const RecipeCard = ({ recipe }) => {
  const [images, setImages] = useState([]);

  const handleFave = (e) => {
    changeFave(recipe.id, e.target.checked);
  };

  const getImages = (recipeId) => {
    getImagesByRecipeId(recipeId).then((imagesFromAPI) => {
      setImages(imagesFromAPI);
    });
  };

  useEffect(() => {
    getImages(recipe.id);
  }, []);

  return (
    <>
      <div className="recipe-card">
        <Link to={`/recipes/${recipe?.id}`}>
          <div className="recipe-image">
            {images[0] ? (
              <img
                src={`${images[0].image_path}`}
                alt={recipe?.name}
                className="recipe-photo"
              />
            ) : (
              <img src={photo} alt="default-dessert" className="recipe-photo" />
            )}
          </div>
        </Link>
        <div className="recipe-text-wrapper">
          <Link to={`/recipes/${recipe?.id}`}>
            <div className="recipe-name">{recipe?.name}</div>
          </Link>
          <div className="line">
            <hr />
          </div>
          <div className="rate-fave-wrapper">
            <Link to={`/recipes/${recipe?.id}`}>
              <div className="recipe-stars">
                Rating: {formatStars(recipe?.ratingId)}
              </div>
            </Link>
            <Checkbox
              color="error"
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              defaultChecked={recipe?.isFave}
              onChange={(e) => handleFave(e)}
            />
          </div>
          <Link to={`/recipes/${recipe?.id}`}>
            <div className="recipe-description">
              {`${recipe.description.substring(120, 0).concat("...")}`}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
