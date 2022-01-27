import React from "react";

export const CategoryCard = ({ category }) => {
  return (
    <div className="categories">
      <div className="category-card">
        <div className="category-icon">
          {category[0]?.image ? (
            <img
              src={require(`../../images/${category[0]?.image}`).default}
              alt="icon"
              className="icon"
            />
          ) : (
            ""
          )}
        </div>
        <div className="title">{category.name}</div>
      </div>
    </div>
  );
};
