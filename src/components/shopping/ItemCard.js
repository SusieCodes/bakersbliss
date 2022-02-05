//Author: Susie Stanley
//Purpose: Displays items on user's shopping list

import React from "react";
import { GrCheckbox } from "react-icons/gr";
import { FaTrash } from "react-icons/fa";

export const ItemCard = ({ item, handleDelete }) => {
  return (
    <>
      <div className="item-card">
        <div className="item-info">
          <div>{item.text}</div>
        </div>

        <div className="item-icons">
          <div className="item-delete" onClick={() => handleDelete(item.id)}>
            <FaTrash className="item-delete-icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export const ListPrintCard = ({ item }) => {
  return (
    <>
      <div className="print-item-card">
        <div className="print-item-text">{item.text}</div>

        <div className="print-item-icons">
          <div className="item-check">
            <GrCheckbox className="item-check-icon" />
          </div>
        </div>
      </div>
    </>
  );
};
