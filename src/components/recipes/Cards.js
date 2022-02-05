import React, { useState } from "react";
import { addNote } from "./RecipeManager";
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

export const EditIngredientCard = ({ ingred, handleDelete }) => {
  return (
    <>
      <div className="edit-ingredient-info">
        <div>
          ❉ {ingred?.amount} {ingred?.measurement} {ingred?.label}
        </div>
        <button
          type="button"
          className="ingred-delete"
          onClick={() => handleDelete(ingred?.id)}
        >
          <FaTrash className="delete-icon" />
        </button>
      </div>
    </>
  );
};

export const EditNoteCard = ({ singleNote, handleDelete }) => {
  // const [note, setNote] = useState({
  //   recipeId: singleNote.recipeId,
  //   text: singleNote.text,
  //   date: singleNote.date,
  //   id: singleNote.id,
  // });

  // const handleNoteChange = (evt) => {
  //   const editedNote = { ...note };
  //   console.log("editedNote is ", editedNote);
  //   editedNote[evt.target.id] = evt.target.value;
  //   setNote(editedNote);
  // };

  // const handleUpdate = (note) => {
  //   if (note.text !== "") {
  //     addNote(note);
  //   }
  // };

  return (
    <>
      {/* previous classNames are notes-header & form-group-notes */}
      <div className="edit-notes">
        <span>
          <small>{formatDateFromIntStr(singleNote?.date)} :</small>{" "}
        </span>
        <div className="text">{singleNote?.text}</div>
        <button type="button" onClick={() => handleDelete(singleNote)}>
          Delete
          {/* <FaTrash className="delete-icon" /> */}
        </button>
      </div>

      {/* <div className="note-date">{formatDateFromIntStr(singleNote.date)}</div>
        <textarea
          name="note"
          id={note.id}
          maxLength="500"
          required
          cols="24"
          rows="2"
          onChange={handleNoteChange}
          placeholder=" Enter recipe note"
          value={note?.text}
        /> */}
      {/* <button type="button" onClick={() => handleUpdate(note)}>
          Update
        </button> */}
      {/* </div> */}
    </>
  );
};
