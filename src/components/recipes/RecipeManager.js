//Author: Susie Stanley
//Purpose: To export multiple components that fetch/update/delete recipe info from database

const url = "http://localhost:8088";

export const getRecipesByUserId = (userId) => {
  return fetch(
    `${url}/recipes/?userId=${userId}&_expand=ratingId&_sort=date&_order=desc`
  ).then((res) => res.json());
};

export const getRecipeById = (id) => {
  return fetch(
    `${url}/recipes/${id}?_expand=category&_expand=ratingId&_embed=ingredients&_embed=notes`
  ).then((res) => res.json());
};

export const deleteRecipe = (id) => {
  return fetch(`${url}/recipes/${id}`, {
    method: "DELETE",
  }).then((result) => result.json());
};

export const deleteIngredient = (id) => {
  return fetch(`${url}/ingredients/${id}`, {
    method: "DELETE",
  }).then((result) => result.json());
};

export const deleteNote = (id) => {
  return fetch(`${url}/notes/${id}`, {
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

export const addIngredient = (ingredient) => {
  return fetch(`${url}/ingredients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ingredient),
  }).then((response) => response.json());
};

export const addImage = (image) => {
  return fetch(`${url}/images`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(image),
  }).then((response) => response.json());
};

export const addNote = (note) => {
  return fetch(`${url}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
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

export const getNotesByRecipeId = (recipeId) => {
  return fetch(
    `${url}/notes/?recipeId=${recipeId}&_sort=timestamp&_order=desc`
  ).then((res) => res.json());
};

export const getAllCategories = () => {
  return fetch(`${url}/categories`).then((res) => res.json());
};

export const getAllNotes = (recipeId) => {
  return fetch(`${url}/notes/?recipeId=${recipeId}`).then((res) => res.json());
};

export const getRecipesByCategory = (userId, categoryId) => {
  return fetch(
    `${url}/recipes/?userId=${userId}&categoryId=${categoryId}&_expand=rating`
  ).then((res) => res.json());
};

export const getCategoryById = (categoryId) => {
  return fetch(`${url}/categories/${categoryId}`).then((res) => res.json());
};

export const getIngredientsByRecipeId = (recipeId) => {
  return fetch(`${url}/ingredients/?recipeId=${recipeId}&_order=asc`).then(
    (res) => res.json()
  );
};

export const getImagesByRecipeId = (recipeId) => {
  return fetch(`${url}/images/?recipeId=${recipeId}&_sort=id&_order=desc`).then(
    (res) => res.json()
  );
};

export const getMeasurements = () => {
  return fetch(`${url}/measurements`).then((res) => res.json());
};
