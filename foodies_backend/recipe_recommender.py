import pandas as pd
import numpy as np


def recommendRecipes(foodList):
    pd.set_option('display.max_colwidth', None)
    recipes_df = pd.read_csv('csv_data/rr-recipes.csv')

    ingredients_input_list = [obj["name"].lower() for obj in foodList]
    print(ingredients_input_list)

    suggestions = recipes_df[recipes_df['ingredients'].apply(
        lambda x: any([k in x for k in ingredients_input_list]))].head(10)

    return suggestions


def main():
    foodList = [
        {
            "name": "Tomato",
            "unit": "kg",
            "quantity": 1
        }
    ]
    aa = recommendRecipes(foodList)
    print(aa)
    print("-----------------------------------------")
    print(aa.head())
    print("-----------------------------------------")
    print(aa.to_json())


if __name__ == "__main__":
    main()
