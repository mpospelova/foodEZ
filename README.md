## FoodEZ

#### The sustainable way to manage food

The mobile app "FoodEZ" allows the user to track the groceries in their household
and avoid food waste.

To start the application, clone this repository with:
```
git clone https://github.com/mpospelova/foodEZ.git
```

There, you will find two folders `foodies_frontend` and `foodies_backend`. For each
individual module you need to run a series of commands.

- Firstly, for `foodies_backend`:
```
cd foodies_backend
pip install -r requirements.txt

# To run the server run from the same folder:
python app.py
```
 
- Secondly, for `foodies_frontend`:
```
cd foodies_frontend
npm install

# To run the application locally on localhost:3000:
npm run dev
```

Alternatively, you could use the link: *https://foodies-frontend-neon.vercel.app/*