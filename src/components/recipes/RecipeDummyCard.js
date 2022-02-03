//Author: Susie Stanley
//Purpose: Creates and displays a dummy recipe card when user doesn't have any yet

import React from "react";
import { Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import photo from "../../images/defaultcupcake.png";

export const RecipeDummyCard = () => {
  return (
    <>
      <div className="recipe-card">
        <div className="recipe-image">
          <img src={photo} alt="default-dessert" className="recipe-photo" />
        </div>
        <div className="recipe-text-wrapper">
          <div className="recipe-name">Recipe Name</div>
          <div className="line">
            <hr />
          </div>
          <div className="rate-fave-wrapper">
            <div className="recipe-stars">Rating: ★★★★★</div>
            <Checkbox
              color="error"
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
            />
          </div>

          <div className="recipe-description">
            You Can Create A Recipe Using The "Add Recipe" Button Above
          </div>
        </div>
      </div>
    </>
  );
};
