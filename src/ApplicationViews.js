import { Route } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Navigation } from "./components/nav/Navigation";
import { Dashboard } from "./components/dashboard/Dashboard";
import { AllRecipes } from "./components/recipes/AllRecipes";
// import { RecipeBoard } from "./components/recipes/OldRecipeBoard";
import { Cookies } from "./components/categories/Cookies";
import { Cakes } from "./components/categories/Cakes";
import { Cupcakes } from "./components/categories/Cupcakes";
import { Muffins } from "./components/categories/Muffins";
import { Brownies } from "./components/categories/Brownies";
import { Bars } from "./components/categories/Bars";
import { Holidays } from "./components/categories/Holidays";
import { Breads } from "./components/categories/Breads";
import { Pies } from "./components/categories/Pies";
import { Frosting } from "./components/categories/Frosting";
import { Candy } from "./components/categories/Candy";
import { Donuts } from "./components/categories/Donuts";
import { Chocolate } from "./components/categories/Chocolate";
import { Other } from "./components/categories/Other";
import { RecipeForm } from "./components/recipes/RecipeForm";
import { RecipeEditForm } from "./components/recipes/RecipeEditForm";
import { RecipeDetail } from "./components/recipes/RecipeDetail";

export const ApplicationViews = ({
  setAuthUser,
  isAuthenticated,
  clearUser,
}) => {
  return (
    <>
      <Route path="/">
        {isAuthenticated ? <Navigation clearUser={clearUser} /> : null}
      </Route>

      <Route exact path="/">
        <Login setAuthUser={setAuthUser} />
      </Route>

      <Route exact path="/register">
        <Register setAuthUser={setAuthUser} />
      </Route>

      <Route exact path="/dashboard">
        <Dashboard />
      </Route>

      <Route exact path="/allrecipes">
        <AllRecipes />
      </Route>

      <Route exact path="/cookies">
        <Cookies />
      </Route>

      <Route exact path="/cakes">
        <Cakes />
      </Route>

      <Route exact path="/cupcakes">
        <Cupcakes />
      </Route>

      <Route exact path="/muffins">
        <Muffins />
      </Route>

      <Route exact path="/brownies">
        <Brownies />
      </Route>

      <Route exact path="/bars">
        <Bars />
      </Route>

      <Route exact path="/holidays">
        <Holidays />
      </Route>

      <Route exact path="/breads">
        <Breads />
      </Route>

      <Route exact path="/pies">
        <Pies />
      </Route>

      <Route exact path="/frosting">
        <Frosting />
      </Route>

      <Route exact path="/candy">
        <Candy />
      </Route>

      <Route exact path="/donuts">
        <Donuts />
      </Route>

      <Route exact path="/chocolate">
        <Chocolate />
      </Route>

      <Route exact path="/other">
        <Other />
      </Route>

      <Route exact path="/recipes/create">
        <RecipeForm />
      </Route>

      <Route exact path="/recipes/:recipeId(\d+)/edit">
        <RecipeEditForm />
      </Route>

      <Route exact path="/recipes/:recipeId(\d+)">
        <RecipeDetail />
      </Route>
    </>
  );
};
