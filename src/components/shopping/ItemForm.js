import React, { useState } from "react";
import { useHistory } from "react-router";
import { addItem } from "./ShoppingManager";
import { WelcomeBar2 } from "../nav/WelcomeBar2";

export const ItemForm = () => {
  const [conflictDialog, setConflictDialog] = useState(false);

  const [item, setItem] = useState({
    text: "",
    userId: parseInt(localStorage.getItem("bb_user")),
  });

  const history = useHistory();

  const handleFieldChange = (event) => {
    const newItem = { ...item };
    newItem[event.target.id] = event.target.value;
    setItem(newItem);
  };

  const handleSave = (evt) => {
    evt.preventDefault(); // Prevents the browser from submitting the form

    if (item.text === "") {
      setConflictDialog(true);
    } else {
      addItem(item).then(() => history.push("/shopping"));
    }
  };

  return (
    <>
      <div className="add-item">
        <WelcomeBar2 title="Add New Item" />

        <div className="create-wrapper">
          <fieldset>
            <dialog className="dialog" open={conflictDialog}>
              <div className="dialog-forms">Please add an item</div>
              <button
                className="button-close"
                onClick={(e) => setConflictDialog(false)}
              >
                Close
              </button>
            </dialog>

            <div className="form-group-item">
              <label htmlFor="text" className="item-label">
                Item:{" "}
              </label>
              <input
                type="text"
                id="text"
                maxLength="25"
                onChange={handleFieldChange}
                required
                autoFocus
                placeholder="e.g. Sugar"
                value={item?.text}
              />
            </div>
          </fieldset>

          <div className="form-btns">
            <button type="button" className="form-btn" onClick={handleSave}>
              Submit
            </button>

            <button
              type="button"
              className="form-btn"
              onClick={() => {
                history.push("/shopping");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
