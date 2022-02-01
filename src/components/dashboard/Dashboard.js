// Purpose: To display user relevant info when first logging in

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { WelcomeBar } from "../nav/WelcomeBar";
import { CategoryCard } from "../categories/CategoryCard";
import { getAllCategories } from "../../components/recipes/RecipeManager";

export const Dashboard = () => {
  const [categories, setCategories] = useState([]);

  // get categories from database and set it to state
  const getCategories = () => {
    getAllCategories().then((categories) => {
      setCategories(categories);
    });
  };

  useEffect(() => {
    getCategories();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <div className="dashboard">
        <div className="categories">
          <WelcomeBar title="Categories" />
          <div className="category-container">
            {categories.map((category, index) => (
              <Link
                to={`/category/${category.id}`}
                title={category?.name}
                key={index}
              >
                <CategoryCard key={category.id} category={category} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
