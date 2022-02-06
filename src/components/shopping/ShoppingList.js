import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteItem, getItemsByUserId } from "./ShoppingManager";
import { ItemCard } from "./ItemCard";
import { WelcomeBar3 } from "../nav/WelcomeBar3";

export const ShoppingList = () => {
  const [items, setItems] = useState([]);

  const getItems = () => {
    getItemsByUserId(localStorage.getItem("bb_user")).then((userItems) => {
      setItems(userItems);
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
      <div className="shopping-list">
        <WelcomeBar3 title="Shopping List" />

        <div className="shopping-create">
          <Link to={`/items/create`}>
            <button className="add-item">Add Item</button>
          </Link>

          <div className="item-list">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} handleDelete={handleDelete} />
            ))}
            <div className="list-print">
              <Link to={`/shopping/print`}>
                <div className="list-print-btn">Print</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
