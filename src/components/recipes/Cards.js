import React from "react";
import { formatDateFromIntStr } from "../../helper";

export const NoteCard = ({ note }) => {
  return (
    <>
      <div className="recipe-notes">
        <span className="note-wrapper">
          {formatDateFromIntStr(note?.date)} :{" "}
        </span>
        <div className="text">{note?.text}</div>
      </div>
    </>
  );
};

export const IngredientCard = ({ ingredient }) => {
  console.log("ingredient is ", ingredient);
  return (
    <>
      <div className="ingredient-info">
        ❉{" "}
        <span>
          {ingredient.amount} {ingredient.measurement.name} {ingredient.label}
        </span>
      </div>
    </>
  );
};
