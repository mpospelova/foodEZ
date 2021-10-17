import React from "react";

const GlobalContext = React.createContext({
  foodList: [],
  recipeList: [],
  // shoppingList: [],
  update: (data) => {},
});

export default GlobalContext;
