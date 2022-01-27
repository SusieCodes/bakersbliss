import React, { useState } from "react";

export const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const handleClick = (index) => setActiveIndex(index);
  const checkActive = (index, className) =>
    activeIndex === index ? className : "";
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
            <div className="category-container">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
          <div className={`panel ${checkActive(2, "active")}`}>
            <p>TAB 2 CONTENT</p>
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
