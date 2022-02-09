import React from "react";
import { formatDateFromIntStr } from "../../helper";
import { FaTrash } from "react-icons/fa";

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
  return (
    <>
      <div className="ingredient-info">
        ❉{" "}
        <span>
          {ingredient?.amount} {ingredient?.measurement} {ingredient?.label}
        </span>
      </div>
    </>
  );
};

export const EditIngredientCard = ({ ingred, handleDeleteIngred }) => {
  return (
    <>
      <div className="edit-ingredient-info">
        <div>
          ❉ {ingred?.amount} {ingred?.measurement} {ingred?.label}
        </div>
        <button type="button" onClick={() => handleDeleteIngred(ingred?.id)}>
          <FaTrash className="delete-icon" />
        </button>
      </div>
    </>
  );
};

export const EditNoteCard = ({ singleNote, handleDeleteNote }) => {
  return (
    <>
      {/* classNames that wrap this component are notes-header > form-group-notes */}
      <div className="edit-notes">
        <div className="note-wrapper">
          <span>
            <small>{formatDateFromIntStr(singleNote?.date)} :</small>{" "}
          </span>
          <div className="text">{singleNote?.text}</div>
        </div>
        <button type="button" onClick={() => handleDeleteNote(singleNote.id)}>
          Delete
          {/* <FaTrash className="delete-icon" /> */}
        </button>
      </div>
    </>
  );
};
