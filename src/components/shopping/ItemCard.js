//Author: Susie Stanley
//Purpose: Displays items on user's shopping list

import React from "react";
import { useHistory } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

export const ItemCard = ({ item, handleDelete }) => {
  const history = useHistory();

  return (
    <>
      <div className="item-card">
        <div className="item-info">
          <div>{item.text}</div>
        </div>

        <div className="item-icons">
          <div
            className="item-edit"
            onClick={() => history.push(`/items/${item.id}/edit`)}
          >
            <FaEdit className="item-edit-icon" />
          </div>
          <div className="item-delete" onClick={() => handleDelete(item.id)}>
            <FaTrash className="item-delete-icon" />
          </div>
        </div>
      </div>
    </>
  );
};

// invoked on PrintList.js line 28
export const ListPrintCard = ({ item }) => {
  return (
    <>
      <div className="print-item">
        <div className="print-item__text">{item.text}</div>

        <div className="print-item__icons">
          <div className="item-checkbox"></div>
        </div>
      </div>
    </>
  );
};
