import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./RecipeList.module.css";

import RecipeItem from "../RecipeItem/RecipeItem";
const RecipeList = ({ recipes }) => {
  console.log("recipeeList", recipes);
  return (
    <div>
      <div className={styles.RecipeList__container}>
        <h2 className={styles.RecipeList__header}> Recipes </h2>
      </div>
      <div className={styles.RecipeList__swiperContainer}>
        <Swiper slidesPerView={"auto"} spaceBetween={5}>
          {recipes.map(({ recipe_id, title, cook_time, url, photo_url }) => (
            <SwiperSlide key={recipe_id} className={styles.swiperSlide}>
              <RecipeItem
                name={title}
                cookingTime={cook_time}
                url={url}
                photo_url={photo_url}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RecipeList;
