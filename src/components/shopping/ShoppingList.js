import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteItem, addItem, getItemsByUserId } from "./ShoppingManager";
import { ItemCard } from "./ItemCard";
import { WelcomeBar2 } from "../nav/WelcomeBar2";

export const ShoppingList = () => {
  const [items, setItems] = useState([]);

  const getItems = () => {
    getItemsByUserId(localStorage.getItem("bb_user")).then((userItems) => {
      setItems(userItems);
    });
  };

  const handleAddItem = (item) => {
    addItem(item).then(() => {
      getItems();
    });
  };

  const handleDelete = (id) => {
    deleteItem(id).then(() => {
      getItems();
    });
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <div className="page">
        <WelcomeBar2 title="Shopping List" />

        <div className="shopping-flex">
          <div className="add-item">
            <button onClick={handleAddItem} className="add-item">
              + Add Items
            </button>
          </div>

          <div className="shopping-items">
            <div className="item-list">
              {items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          </div>
          <div className="list-print">
            <Link to={`/shopping/print`}>
              <button className="printable-btn">Print</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
