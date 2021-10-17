import React from "react";
import { SwiperSlide } from "swiper/react";
import styles from "./RecipeItem.module.css";

const RecipeItem = ({ name, cookingTime, url, photo_url }) => {
  return (
    <div className={styles.RecipeItem__container}>
      <div className={styles.RecipeItem__header}>
        <a href={url} className={styles.RecipeItem__howToMakeText}>
          How to make
        </a>
        <h1 className={styles.RecipeItem__name}>{name}</h1>
      </div>
      <div className={styles.RecipeItem__imageContainer}>
        <img src={photo_url} className={styles.RecipeItem__photoURL} />
      </div>
      <div className={styles.RecipeItem__cookingTime}>{cookingTime} mins</div>
    </div>
  );
};

export default RecipeItem;
