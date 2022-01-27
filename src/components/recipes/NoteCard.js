import React from "react";

export const NoteCard = () => {
  return (
    <>
      <div className="title-date-wrapper">
        <div className="">
          <h3>Notes:</h3>
        </div>
        <div className="">{recipeNotes.date}</div>
      </div>
      <p className="notes">{recipe?.notes}</p>
    </>
  );
};
