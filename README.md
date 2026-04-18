# Final Project: Vet Clinic API

A RESTful API for managing a vet clinic's records built with Node.js, Express.js, and Sequelize ORM using SQLite database.

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Set up the database:
   ```bash
   node database/setup.js
   ```

5. Seed the database with sample data:
   ```bash
   node database/seed.js
   ```

6. Start the server:
   ```bash
   node server.js
   ```

## API Endpoints

### USER ROUTE
### Create New User
- **POST** `/api/register`
- Creates a new user
- **Body:**
  ```json
    {
        "name": "Mary Sherif",
        "email": "mary@vet.com",
        "password": "passwordHere",
        "role": "admin"
    }
  ```

### Login User
- **POST** `/api/login`
- Logs in a user
- **Body:**
  ```json
    {
        "email": "mary@vet.com",
        "password": "passwordHere"
    }
  ```

### Logout
- **POST** `/api/logout`
- Logs out a user


### PETS ROUTE
### Get All Pets
- **GET** `/api/pets`
- Returns all pets in the database

### Get Pet by ID
- **GET** `/api/pets/:id`
- Returns a specific pet by ID

### Create New Pet
- **POST** `/api/pets`
- Creates a new pet
- **Body:**
  ```json
  {
    "ownerName": "Larry",
    "name": "Grilled Cheese",
    "species": "cat",
    "breed": "dom longhair",
    "gender": "female",
    "age": "4 years",
    "color": "brown tabby"
  }
  ```

### Update Pet
- **PUT** `/api/pets/:id`
- Updates an existing pet
- **Body:** Same as create pet

### Delete Pet
- **DELETE** `/api/pets/:id`
- Deletes a pet by ID

### VISITS ROUTE
### Get All Visits
- **GET** `/api/visits`
- Returns all visits in the database

### Get Visit by ID
- **GET** `/api/visits/:id`
- Returns a specific visit by ID

### Create New Visit
- **POST** `/api/visits`
- Creates a new visit
- **Body:**
  ```json
  {
    "visitDate": "",
    "initialReason": "Annual vaccines",
    "symptoms": "None",
    "diagnosis": "Healthy",
    "priority": "low"
  }
  ```

### Update Visit
- **PUT** `/api/visits/:id`
- Updates an existing visit
- **Body:** Same as create visit

### Delete Visit
- **DELETE** `/api/visits/:id`
- Deletes a visit by ID

### TREATMENTS ROUTE
### Get All Treatments
- **GET** `/api/treatments`
- Returns all treatments in the database

### Get Treatment by ID
- **GET** `/api/treatments/:id`
- Returns a specific treatment by ID

### Create New Treatment
- **POST** `/api/treatments`
- Creates a new treatment
- **Body:**
  ```json
  {
    "issue": "sore leg from vaccines",
    "description": "Administered vaccines in right front leg, will be sore and pet will be tired",
    "instructions": "Monitor for any fever or abnormal lack of energy"
  }
  ```

### Update Treatment
- **PUT** `/api/treatments/:id`
- Updates an existing treatment
- **Body:** Same as create treatment

### Delete Treatment
- **DELETE** `/api/treatments/:id`
- Deletes a treatment by ID

## Database Schema

The `user` table contains the following fields:

- `id` (INTEGER, Primary Key, Auto Increment)
- `name` (STRING, Required)
- `email` (STRING, Required)
- `password` (STRING, Required)
- `role` (STRING, Required)

The `pets` table contains the following fields:

- `id` (INTEGER, Primary Key, Auto Increment)
- `ownerName` (STRING, Required)
- `name` (STRING, Required)
- `species` (STRING, Required)
- `breed` (STRING, Required)
- `gender` (STRING, Required)
- `age` (STRING, Required)
- `color` (STRING, Required)

The `visits` table contains the following fields:

- `id` (INTEGER, Primary Key, Auto Increment)
- `visitDate` (DATE, Required)
- `initialReason` (STRING, Required)
- `symptoms` (STRING, Required)
- `diagnosis` (STRING, Required)
- `priority` (STRING)

The `treatments` table contains the following fields:

- `id` (INTEGER, Primary Key, Auto Increment)
- `issue` (STRING, Required)
- `description` (TEXT)
- `instructions` (TEXT, Required)

## Postman Documentation URL
https://documenter.getpostman.com/view/52413032/2sBXitDTFt

## Render URL
https://backenddev-finalproject.onrender.com

## Project Structure

```
final-project/
├── database/
│   ├── setup.js              # Database setup and model definitions
│   └── seed.js               # Sample data seeding
├── tests/
│   ├── helpers.test.js       # Setup for tests
│   ├── pets.test.js          # Tests for Pets API
│   ├── treatments.test.js    # Tests for Treatments API
│   ├── user.test.js          # Tests for User API
│   └── visits.test.js        # Tests for Visits API
├── server.js                 # Main server file with API routes
├── package.json
├── .env                      # Environment variables
├── .gitignore
└── README.md
```