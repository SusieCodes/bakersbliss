// Purpose: To display user relevant info when first logging in

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/Grid";
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
            {/* <Link to={`/category/${category?.id}`} title={category?.name}> */}
            {categories.map((category, index) => (
              <Link
                to={`/category/${category.id}`}
                title={category?.name}
                key={index}
              >
                <CategoryCard key={category.id} category={category} />
              </Link>
            ))}

            {/* {categories.map((category) => ( */}
            {/* <Link to={category?.path} title={category?.name}> */}
            {/* <CategoryCard key={category.id} category={category} /> */}
            {/* </Link> */}
            {/* ))} */}

            {/* {categories.map((category) => ( */}
            {/* <Grid
                container */}
            {/* // spacing={{ xs: 2, md: 3, lg: 4 }} */}
            {/* columns={{ xs: 4, sm: 6, md: 8, lg: 12 }} */}
            {/* direction="row" */}
            {/* justifyContent="space-between" */}
            {/* alignItems="center" */}
            {/* key={category?.id} */}
            {/* > */}
            {/* <Link to={`/category/${category?.id}`} title={category?.name}> */}
            {/* <Item> */}
            {/* <CategoryCard category={category} /> */}
            {/* </Item> */}
            {/* </Link> */}
            {/* </Grid> */}
            {/* ))} */}
          </div>
        </div>
      </div>
    </>
  );
};
