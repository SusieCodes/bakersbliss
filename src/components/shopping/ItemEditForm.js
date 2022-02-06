import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { getItemById, updateItem } from "./ShoppingManager";
import { WelcomeBar2 } from "../nav/WelcomeBar2";

export const ItemEditForm = () => {
  const { itemId } = useParams();
  const history = useHistory();

  const [item, setItem] = useState({
    text: "",
    userId: parseInt(localStorage.getItem("bb_user")),
  });
  const [conflictDialog, setConflictDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = (evt) => {
    const editedItem = { ...item };
    editedItem[evt.target.id] = evt.target.value;
    setItem(editedItem);
  };

  const updateExistingItem = (evt) => {
    evt.preventDefault();
    setIsLoading(true);

    // This is an edit, so we need the id
    const editedItem = {
      text: item.text,
      userId: item.userId,
      id: itemId,
    };

    if (item.text === "") {
      setConflictDialog(true);
      setIsLoading(false);
    } else {
      updateItem(editedItem).then(() => history.push("/shopping"));
    }
  };

  useEffect(() => {
    getItemById(itemId).then((item) => {
      setItem(item);
      setIsLoading(false);
    });
  }, [itemId]);

  return (
    <div className="edit-item">
      <WelcomeBar2 title="Edit Item" />

      <div className="edit-wrapper">
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
            <label htmlFor="text">Item:</label>
            <input
              type="text"
              id="text"
              maxLength="25"
              required
              onChange={handleFieldChange}
              value={item?.text}
            />
          </div>
        </fieldset>

        <div className="form-btns">
          <button
            type="button"
            disabled={isLoading}
            onClick={updateExistingItem}
            className="form-btn"
          >
            Submit
          </button>

          <button
            type="button"
            onClick={() => history.push(`/shopping`)}
            className="form-btn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
