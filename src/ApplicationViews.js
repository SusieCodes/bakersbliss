import { Route } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Navigation } from "./components/nav/Navigation";
import { Dashboard } from "./components/dashboard/Dashboard";
import { CategoryBoard } from "./components/categories/CategoryBoard";
import { RecipeForm } from "./components/recipes/RecipeForm";
import { RecipeEditForm } from "./components/recipes/RecipeEditForm";
import { RecipeDetail } from "./components/recipes/RecipeDetail";
import { UserDetail } from "./components/users/UserDetail";
import { UserEditForm } from "./components/users/UserEditForm";
import { ShoppingList } from "./components/shopping/ShoppingList";
import { ItemForm } from "./components/shopping/ItemForm";
import { ItemEditForm } from "./components/shopping/ItemEditForm";
import { PrintList } from "./components/shopping/PrintList";
import { PrintRecipe } from "./components/recipes/PrintRecipe";

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
        <Login setAuthUser={setAuthUser} clearUser={clearUser} />
      </Route>

      <Route exact path="/register">
        <Register setAuthUser={setAuthUser} />
      </Route>

      <Route exact path="/dashboard">
        <Dashboard />
      </Route>

      <Route exact path="/category/:categoryId(\d+)">
        <CategoryBoard />
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

      <Route exact path="/users/:userId(\d+)">
        <UserDetail />
      </Route>
      <Route exact path="/users/:userId(\d+)/edit">
        <UserEditForm />
      </Route>

      <Route exact path="/shopping">
        <ShoppingList />
      </Route>

      <Route exact path="/items/create">
        <ItemForm />
      </Route>

      <Route exact path="/items/:itemId(\d+)/edit">
        <ItemEditForm />
      </Route>

      <Route exact path="/shopping/print">
        <PrintList />
      </Route>

      {/* <Route exact path="/recipes/:recipeId(\d+)/print">
        <PrintRecipe />
      </Route> */}
    </>
  );
};
