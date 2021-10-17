import FoodInputField from "../components/food_input";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

import { useContext } from "react";
import GlobalContext from "../utils/global-context";
import FoodCard from "./food_card";
import { api_all } from "../utils/api-calls";

export default function InputPage() {
  const global = useContext(GlobalContext);

  const [name, setName] = useState("");
  const [unit, setUnit] = useState();
  const [quantity, setQuantity] = useState("");
  const [localFoodList, setLocalFoodList] = useState([]);

  const appendToLocalList = (newFood) => {
    setLocalFoodList([...localFoodList, newFood]);
  };

  const onClickSubmit = async () => {
    const newFoodList = [...global.foodList, ...localFoodList];
    global.update({
      ...global,
      foodList: newFoodList,
    });

    api_all(newFoodList).then((apiObject) => {
      global.update({
        ...global,
        recipeList: apiObject?.result,
        foodList: newFoodList,
      });
    });

    setLocalFoodList([]);
  };

  const addNewTextField = () => {
    if (!name || !quantity) {
      return;
    }

    const currDate = new Date();
    const yymmdd = currDate.toISOString().split("T")[0];
    //We define random offset of current date to get expiration date. Offset is uniformly random of 20 days
    const random_offset = Math.round(
      (Math.random() - 0.2) * 20 * 24 * 60 * 60 * 1000
    );
    const expir_date = new Date(currDate.getTime() + random_offset);
    const expir_date_yymmdd = expir_date.toISOString().split("T")[0];
    const newFood = {
      id: uuidv4(),
      name: name,
      unit: unit,
      quantity: quantity,
      time: yymmdd,
      expir_date: expir_date_yymmdd,
    };

    setName("");
    setUnit("");
    setQuantity("");

    // appendToFoodList(newFood);
    appendToLocalList(newFood);
  };

  return (
    <div className="input_page">
      <div className="input_box">
        <div className="input_container">
          <h2 className="input_page_title"> Groceries</h2>
          <FoodInputField
            name={name}
            setName={setName}
            quantity={quantity}
            setQuantity={setQuantity}
            unit={unit}
            setUnit={setUnit}
          />
        </div>
        <button className="input_button" onClick={addNewTextField}>
          +
        </button>
      </div>

      <Link href="/">
        {localFoodList.length ? (
          <button className="submit_button" onClick={onClickSubmit}>
            Submit
          </button>
        ) : (
          <button className="submit_button">Return</button>
        )}
      </Link>

      <div className="food_card_container">
        {localFoodList.map(({ id, name, quantity, unit }) => (
          <FoodCard key={id} name={name} quantity={quantity} unit={unit} />
        ))}
      </div>

      <div className="input_page_image_container">
        <img src="/5245.jpg" />
      </div>

      {!localFoodList.length && (
        <h3 className="input_page_motivational_text">
          You can add your new groceries here!
        </h3>
      )}

      {/* <a
        className="input_page_source"
        href="https://www.freepik.com/vectors/food"
      ></a> */}
    </div>
  );
}
