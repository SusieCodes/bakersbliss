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

// export const NoteEditCard = ({ singleNote }, { handleFieldChange }) => {
//   return (
//     <>
//       <label htmlFor={singleNote.id}>Notes: </label>
//       <textarea
//         name={singleNote.id}
//         id={singleNote.id}
//         maxLength="1000"
//         required
//         cols="24"
//         rows="2"
//         onChange={handleFieldChange}
//         className="form-group__edit"
//         placeholder=" Enter recipe singleNotes"
//         value={singleNote.text}
//       />
//     </>
//   );
// };

export const IngredientCard = ({ ingredient }) => {
  console.log("ingredient is ", ingredient);
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
  console.log("ingredient is ", ingred);
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
