import React from "react";
import { formatDateNoWeekday } from "../../helper";

export const NoteCard = ({ note }) => {
  return (
    <>
      <div className="title-date-wrapper">
        <div className="">
          <h3>Notes:</h3>
        </div>
        <div className="">{formatDateNoWeekday(note?.date)}</div>
      </div>
      <p className="notes">{note?.text}</p>
    </>
  );
};
