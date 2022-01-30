//Author: Susie Stanley
//Purpose: Creates and displays individual recipe cards for a single recipe that is passed as a prop

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { changeFave, getAllImages } from "./RecipeManager";
import photo from "../../images/defaultcupcake.png";

export const RecipeCard = ({ recipe }) => {
  const [images, setImages] = useState([]);

  // const formatStars = (stars) => {
  //   if (stars == 1) {
  //     return "★☆☆☆☆";
  //   } else if (stars == 2) {
  //     return "★★☆☆☆";
  //   } else if (stars == 3) {
  //     return "★★★☆☆";
  //   } else if (stars == 4) {
  //     return "★★★★☆";
  //   } else if (stars == 5) {
  //     return "★★★★★";
  //   }
  // };

  const handleFave = (e) => {
    changeFave(recipe.id, e.target.checked);
  };

  const getImages = (recipeId) => {
    getAllImages(recipeId).then((imagesFromAPI) => {
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
            <div className="recipe-stars">Rating: {recipe?.stars}</div>
            <Checkbox
              color="error"
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              defaultChecked={recipe.isFave}
              onChange={(e) => handleFave(e)}
            />
          </div>
          <Link to={`/recipes/${recipe?.id}`}>
            <div className="recipe-description">{recipe?.description}</div>
          </Link>
        </div>
      </div>
    </>
  );
};
