//Author: Susie Stanley
//Purpose: To export multiple components that fetch/update/delete shopping list info from database

const url = "http://localhost:8088";

export const addItem = (item) => {
  return fetch(`${url}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then((response) => response.json());
};

export const deleteItem = (id) => {
  return fetch(`${url}/items/${id}`, {
    method: "DELETE",
  }).then((result) => result.json());
};

export const getItemsByUserId = (id) => {
  return fetch(`${url}/items/?userId=${id}`).then((res) => res.json());
};
