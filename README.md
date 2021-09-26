# Node/Express/TypeScript/MySQL App

# Getting started

First thing first

- go to `src/configs/config.ts` and update configurations according to your system (like DB_NAME, DB_PORT, DB_USER, DB_PASS, etc ).
- go to mysql and create database named `<DB_NAME>`

To get the Node server running locally:

- Clone this repo
- `yarn install` or `npm install` to install all required dependencies
- `yarn start` or `npm run start` (if on linux run `bash ./run.sh`) to start the local server
- download postman collection from [here](https://www.getpostman.com/collections/4292774270e30df42a4c)
- For API (other than signUp and login) add `Authorization = Bearer` generated after logging in 

## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `config/` - This folder contains configuration for passport as well as a central location for configuration/environment variables and database setup.
- `controllers` - This folder handle data passing from services to API end point and vice versa
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models.
- `interfaces/` - This folder contains interface for models
- `middleware/` - This folder handle all middleware functionality like decoding user, throw unauthorised error if end point requires user token
- `utils/` - This folder has all utility tools like jtw signup, email util(if required)
- `services/` - This folder handles database CRUD operation for controller.
- `rules/` - This folder defines the rules for user registeration and login validation

## Authentication

Requests are authenticated using the `Authorization` header with a valid JWT. We define two express middlewares in `middlewares/deserializeUser.ts` and `requiresUser.ts` that can be used to authenticate requests. The `required` middleware configures the `express-jwt` middleware using our application's secret and will return a 401 status code if the request cannot be authenticated. The payload of the JWT can then be accessed from `req.payload` in the endpoint.
