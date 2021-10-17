import React from "react";
import RecipeList from "./recipe_feed/RecipeList/RecipeList";
import FoodDisplay from "./food_display";
import { useContext } from "react";

import Link from "next/link";
import { recipesMock } from "../utils/constants";
import GlobalContext from "../utils/global-context";

export default function LandingPage() {
  const global = useContext(GlobalContext);
  var recipes = global.recipeList;

  console.log("landingpagerecipselist", recipes);
  if (!recipes) {
    recipes = recipesMock;
  }

  return (
    <div className="landing_page">
      <RecipeList recipes={recipes} />
      <FoodDisplay />
      <Link href="/input">
        <button type="button" className="landing_page_toinput_btn">
          <b>+</b>
        </button>
      </Link>
    </div>
  );
}
