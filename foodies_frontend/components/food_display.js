import { useContext } from "react";
import GlobalContext from "../utils/global-context";
import Link from "next/link";
import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from "react-swipeable-list";

import "react-swipeable-list/dist/styles.css";
import { api_all } from "../utils/api-calls";

export default function FoodDisplay() {
  const global = useContext(GlobalContext);

  const computeColor = (food_item) => {
    let currentDate = new Date();
    let food_expir_date = new Date(food_item.expir_date);
    if (food_expir_date - currentDate < 0) {
      return "#dd234b90"; //Red
    } else if (food_expir_date - currentDate < 7 * 24 * 60 * 60 * 1000) {
      return "#ddb52390"; //Yellow
    } else {
      return "#6add2390"; //Green
    }
  };

  const removeFromFoodList = (id) => {
    const filtered = foodList.filter((item) => {
      return item.id != id;
    });

    global.update({
      foodList: filtered,
    });

    api_all(filtered).then((apiObject) => {
      global.update({
        ...global,
        recipeList: apiObject?.result,
        foodList: filtered,
      });
    });
  };

  const trailingActions = (id) => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => removeFromFoodList(id)}>
        <div>
          <div className="FoodDisplay__item-delete">
            <img
              src="/delete.png"
              className="FoodDisplay__item-delete-icon"
              width="30"
              height="30"
            />
          </div>
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  function generateImageUrl(item) {
    return "https://emojiapi.dev/api/v1/" + item.name + "/32.png";
  }

  function handleEmojiError(e) {
    e.target.src = "https://emojiapi.dev/api/v1/red_question_mark/32.png";
  }

  const foodList = global.foodList.slice();

  if (foodList.length === 0) {
    return (
      <>
        <h2 className="food_display_empty_fridge_text">Your Fridge is Empty</h2>
        <div className="food_display_image_container">
          <img src="/emptyfridge.jpg" />
        </div>
      </>
    );
  }

  foodList.sort(function (f1, f2) {
    return new Date(f1.expir_date) - new Date(f2.expir_date);
  });
  return (
    <>
      <div className="food_display_image_container">
        <img src="/emptyfridge.jpg" />
      </div>
      <div className="food_display_frame">
        <SwipeableList type={ListType.ANDROID} threshold={0.2}>
          {foodList.map((item, index) => (
            <SwipeableListItem
              key={item.id || index}
              destructiveCallbackDelay={100}
              trailingActions={trailingActions(item.id)}
            >
              <img
                src={generateImageUrl(item)}
                style={{ float: "left" }}
                onError={handleEmojiError}
              ></img>
              <div
                className="food_display_item"
                key={index}
                style={{ background: computeColor(item) }}
              >
                <b>{item.name}</b> {item.quantity} {item.unit}
              </div>
            </SwipeableListItem>
          ))}
        </SwipeableList>
      </div>
    </>
  );
}
