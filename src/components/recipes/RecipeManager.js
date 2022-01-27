//Author: Susie Stanley
//Purpose: To export multiple components that fetch/update/delete connection info from database

const url = "https://localhost:8088";

export const getRecipesByUserId = (userId) => {
  return fetch(
    `${url}/recipes/?userId=${userId}&_sort=timestamp&_order=desc`
  ).then((res) => res.json());
};

export const getRecipeById = (id) => {
  return fetch(`${url}/recipes/${id}`).then((res) => res.json());
};

export const deleteRecipe = (id) => {
  return fetch(`${url}/recipes/${id}`, {
    method: "DELETE",
  }).then((result) => result.json());
};

export const addRecipe = (recipe) => {
  return fetch(`${url}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  }).then((response) => response.json());
};

export const updateRecipe = (editedRecipe) => {
  return fetch(`${url}/recipes/${editedRecipe.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedRecipe),
  }).then((data) => data.json());
};

export const changeFave = (id, fave) => {
  return fetch(`${url}/recipes/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      isFave: fave,
    }),
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => res.json());
};