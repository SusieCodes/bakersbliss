import React from "react";
import icon from "../../images/3dcake.png";

export const CategoryCard = ({ category }) => {
  return (
    <div className="category-card">
      <div className="category-icon">
        {category.image ? (
          <img
            // src={require(`../../images/${category?.image}`).default}
            src={icon}
            alt="icon"
            className="icon"
          />
        ) : (
          ""
        )}
      </div>
      <div className="title">{category.name}</div>
    </div>
  );
};
