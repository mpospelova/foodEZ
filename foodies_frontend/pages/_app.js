import { useState } from "react";
import GlobalContext from "../utils/global-context";

import "../styles/globals.css";
import "../styles/component_styles/input_page.css";
import "../styles/component_styles/landing_page.css";
import "../styles/component_styles/food_input.css";
import "../styles/component_styles/food_display.css";
import "../styles/component_styles/landing_page.css";
import "../styles/component_styles/food_card.css";

import "swiper/css";
import "swiper/css/bundle";

import "react-swipeable-list/dist/styles.css";

function MyApp({ Component, pageProps }) {
  const [state, setState] = useState({
    foodList: [],
    count: 0,
    update,
  });

  function update(data) {
    setState(Object.assign({}, state, data));
  }

  return (
    <GlobalContext.Provider value={state}>
      <Component {...pageProps} />
    </GlobalContext.Provider>
  );
}

export default MyApp;
