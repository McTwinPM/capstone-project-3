# D&D Initiative App

## TODO

1. Set Up Server
    1. install python dependencies(done)
    2. create server folder/files (done)
    3. App (done)
    4. Models (done)
    5. Config (done)
    6. Seed (done)
    7. Migrate database (done)
2. Set Up Client
    1. install React/Javascript dependencies (done)
    2. Set up pages and components (done)
        1. Login (done)
            1. LoginForm (done)
            2. SignupForm (done)
        2. Character Vault
            1. CharacterList
            2. AddCharacterForm
            3. EditCharacterButton
            4. DeleteCharacterButton
            5. CharacterCard
            6. SearchBar
            7. PaginateButtons
        3. Initiative
            1. EditCharacterButton
            2. AddconditionForm
            3. DeleteCondition
            4. EditCondition
        4. App
            1. Navbar
    3. CSS
        1. App
        2. Login
        3. Initiative
        4. Character Vault
        5. NavBar
3. Clean Up
    1. Backend
        1. remove old code/unneeded comments
    1. Frontend
        1. remove 'assets' and 'public' folders
        2. remove old code/unneeded comments
4. README

## Technology used
1. Backend
    1. Python 3.12
    2. Flask - web framework
    3. Flask-RESTful - REST API Structure
    4. Flask-Migrate - database migrations
    5. Flask-Bcrypt - password hashing
    6. Flask-CORS - cross-origin requests
    7. Marshmellow - schema validation/serialization
    8. Faker - seed data generation
    9. SQLAlchemy - ORM/database
        1. SQLite - database

2. Frontend
    1. React 19 with React DOM
    2. React Router DOM v7 - client-side routing
    3. Vite - build app and server
    4. ESLint - linting


## Setup

Fork and clone this repository

### Install Dependencies
1. Enter the command `pipenv install` to install the dependencies for the backend API.
2. Navigate to the `` folder and enter `npm install` to install necessary dependencies for the frontend client.

### Create Database
1. Navigate to the `server` folder and run `flask db init` to initialize database migration and create the folders for migration data
2. Enter `flask db migrate -m "initial migration"` for first migration
3. Then, enter `flask db upgrade head` to form the database
4. Finally, enter `python seed.py` to run the Seed file and fill your database with random data

### Run The App
1. From the `server` folder, enter `python app.py` to run the backend api.
2. In another terminal, navigate to the `` folder and enter `npm run dev` to start the frontend client


## Routes/Endpoints

1. POST Login (`/login`) - Allows login with username with password

2. POST Signup (`/signup`) - Allows user to create a new username,

3. GET Me (`/me`) - Checks for token, then retrieves current user




## Future Features
