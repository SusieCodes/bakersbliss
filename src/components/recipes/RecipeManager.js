//Author: Susie Stanley
//Purpose: To export multiple components that fetch/update/delete connection info from database

const url = "http://localhost:8088";

export const getRecipesByUserId = (userId) => {
  return fetch(`${url}/recipes/?userId=${userId}&_sort=date&_order=desc`).then(
    (res) => res.json()
  );
};

export const getRecipeById = (id) => {
  return fetch(
    `${url}/recipes/${id}?_expand=category&_embed=images&_embed=ingredients&_embed=notes`
  ).then((res) => res.json());
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

export const getNotesByRecipeId = (recipeId) => {
  return fetch(
    `${url}/notes/?recipeId=${recipeId}&_sort=timestamp&_order=desc`
  ).then((res) => res.json());
};

export const getAllCategories = () => {
  return fetch(`${url}/categories`).then((res) => res.json());
};

export const getAllImages = (recipeId) => {
  return fetch(`${url}/images/?recipeId=${recipeId}`).then((res) => res.json());
};

export const getRecipesByCategory = (userId, categoryId) => {
  return fetch(
    `${url}/recipes/?userId=${userId}&categoryId=${categoryId}`
  ).then((res) => res.json());
};

export const getCategoryById = (categoryId) => {
  return fetch(`${url}/categories/${categoryId}`).then((res) => res.json());
};

export const getIngredientsByRecipeId = (recipeId) => {
  return fetch(
    `${url}/ingredients/?recipeId=${recipeId}&_order=asc&_expand=measurement`
  ).then((res) => res.json());
};
