import React, { useState, useEffect } from "react";
import { WelcomeBar2 } from "../nav/WelcomeBar2";
import { CategoryCard } from "../recipes/CategoryCard";
import { RecipeBoard } from "../recipes/RecipeBoard";
import { getAllCategories } from "../../components/recipes/RecipeManager";

export const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(1);
  const handleClick = (index) => setActiveIndex(index);
  const checkActive = (index, className) =>
    activeIndex === index ? className : "";

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
      <div className="sidebar">
        <div className="tabs">
          <div
            className={`tab1 ${checkActive(1, "active1")}`}
            onClick={() => handleClick(1)}
          >
            1
          </div>
          <div
            className={`tab2 ${checkActive(2, "active2")}`}
            onClick={() => handleClick(2)}
          >
            2
          </div>
          <div
            className={`tab3 ${checkActive(3, "active3")}`}
            onClick={() => handleClick(3)}
          >
            3
          </div>
          <div
            className={`tab4 ${checkActive(4, "active4")}`}
            onClick={() => handleClick(4)}
          >
            4
          </div>
          <div
            className={`tab5 ${checkActive(5, "active5")}`}
            onClick={() => handleClick(5)}
          >
            5
          </div>
        </div>
        <div className="panels">
          <div className={`panel ${checkActive(1, "active")}`}>
            <div className="categories">
              <WelcomeBar2 title="categories" />
              <div className="category-container">
                <div className="category-container__center">
                  <div className="category_extra">
                    {categories.map((category) => (
                      <CategoryCard key={category.id} category={category} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`panel ${checkActive(2, "active")}`}>
            <RecipeBoard />
          </div>
          <div className={`panel ${checkActive(3, "active")}`}>
            <p>TAB 3 CONTENT</p>
          </div>
          <div className={`panel ${checkActive(4, "active")}`}>
            <p>TAB 4 CONTENT</p>
          </div>
          <div className={`panel ${checkActive(5, "active")}`}>
            <p>TAB 5 CONTENT</p>
          </div>
        </div>
      </div>
    </>
  );
};
