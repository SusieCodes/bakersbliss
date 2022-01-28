import React from "react";
import { Link, useHistory } from "react-router-dom";

export const PrimaryBtn = (props) => {
  const { PrimaryBtnLabel } = props;
  return <button className="primary-btn">{PrimaryBtnLabel}</button>;
};

export const SecondaryBtn = (props) => {
  const { SecondaryBtnLabel } = props;
  return <button className="secondary-btn">{SecondaryBtnLabel}</button>;
};

export const AddRecipeBtn = () => {
  return (
    <Link to="recipes/create">
      <button className="add-recipe">Add Recipe</button>
    </Link>
  );
};

export const LogoutBtn = ({ clearUser }) => {
  const history = useHistory;
  return (
    <button
      className="logout"
      onClick={() => {
        clearUser();
        history.push("/");
      }}
    >
      Logout
    </button>
  );
};
