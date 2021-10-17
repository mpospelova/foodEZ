#!/usr/bin/env python
import os

from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
from recipe_recommender import recommendRecipes

import json

app = Flask(__name__)
cors = CORS(app)

port = int(os.environ.get("PORT", 5000))

# Debug related


@app.route('/')
@app.route('/hello')
def hello():
    return "Hello World!"


@app.route('/all', methods=['POST', 'OPTIONS'])
def all():
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    response_data = request.get_json()
    if response_data is None:
        return {}, 400
    food_list = response_data["foodList"]
    for a in food_list:
        print("food item " + str(a))

    # Creating mocked response
    response = recommendRecipes(food_list)
    responseDict = {"result": response.to_dict(orient="records")}
    # responseDict = json.loads(response.to_json(orient="values"))


    print(responseDict)

    # mocked_response_json = json.load(open('mocked_response.json'))
    # print(response.head())
    # print(response.to_json())
    return _corsify_actual_response(jsonify(responseDict)), 200


def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response


def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == "__main__":
    app.run(
        debug=True,
        host="0.0.0.0",
        port=port
    )
