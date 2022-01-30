import React from "react";

export const CategoryCard = ({ category }) => {
  return (
    <>
      <div className="category-card">
        <div className="category-icon">
          {category?.image ? (
            <img
              src={require(`../../images/${category?.image}`)}
              alt="icon"
              className={`icon ${category}`}
            />
          ) : (
            ""
          )}
        </div>
        <div className="title">{category?.name}</div>
      </div>
    </>
  );
};
