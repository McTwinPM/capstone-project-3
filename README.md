# D&D Initiative App

This is my D&D Initiative Tracker for Dungeon Masters.

This app allows users to create an account with a username and password. Once logged in, the user can create and store any number of characters with information necessary for combat (Name, Armor Class, Hit Points, and Initiative roll), as well as the ability to edit and delete them on the fly. Users can also add or remove status effects, or Conditions, to characters with little commands.


## Technology used
1. Backend
    1. Python 3.12
    2. Flask - web framework
    3. Flask-RESTful - REST API Structure
    4. Flask-Migrate - database migrations
    5. Flask-Bcrypt - password hashing
    6. Flask-CORS - cross-origin requests
    7. Flask-JWT-Extended - Auhorization/Authentication
    8. Marshmellow - schema validation/serialization
    9. Faker - seed data generation
    10. Flask-SQLAlchemy - ORM/database
        1. SQLite - database

2. Frontend
    1. React 19 with React DOM
    2. React Router DOM v7 - client-side routing
    3. Vite - build app and server
    4. ESLint - linting

## Links

If you'd like to look at the the live version, Here is the link to the fontend
https://mctwins-dandd-initiative-tracker.onrender.com

Here is the link to the API
https://mctwins-dandd-initiative-app.onrender.com


## Setup

Fork and clone this repository

### Create .env
From the root directory, type:
```bash
cd initiative-tracker-client #Naviage to client folder
touch .env #Creates environment file
```
Inside .env add:
```bash
VITE_API_URL=/api # This tells the client where to send API requests.
```
### Install Dependencies
From the root directory, enter:
```bash
pipenv install #install the dependencies for the backend API
cd initiative-tracker-client #Naviage to client folder
npm install #install dependencies for the frontend client
```

### Create Database
From the root directory, enter:
```bash
cd server #Naviage to backend folder
flask db init #initialize database migration and create the folders for migration data
flask db migrate -m "initial migration" #marks first migration
flask db upgrade head #forms the database
python seed.py #Runs the seed file and fills database with random data
```

### Run The App
Using two terminals, but starting from the root directory
1. In one terminal enter:
```bash
cd server #Naviage to backend folder
python app.py #Runs the backend API
```
2. In the second terminal, enter:
```bash
cd initiative-tracker-client #Naviage to client folder
npm run dev #start the frontend React client
```


## Routes/Endpoints

1. POST Login (`/login`) - Allows login with username with password

2. POST Signup (`/signup`) - Allows user to create a new username,

3. GET Me (`/me`) - Checks for token, then retrieves current user

4. GET and POST Characters (`/characters`) – Retrieves all characters and allows the creation of new characters.

5. PATCH and DELETE Characters (`/characters/${id}`) – Allows editing of character information and deleting characters.

6.	GET and POST Conditions (`/characters/${id}/conditions`) – Allows retrieving all conditions and adding new conditions to each character.

7.	PATCH and DELETE conditions (`/characters/${id}/conditions/${id}`) – Allows editing conditions and deleting conditions.


## Future Features
1. File upload feature - This will allow DMs to upload character sheets (informational documents with ALL information on that character, both relevant and not relevant to combat) for reference when needed.

2. Text area for characters - This will allow DMs to make notes on certain characters. These notes could give context to any custom condtion the user has created.

3. UI improvements - As features get added, I would like to make it look more modern, without sacrificing the usability.