// Import the database connection
// Import the Mongoose model or schema registration
const database = require("./database/database");
const registerRouter = require("./router/userRoutes.js");
require("./models/userRegisterModels");

// Load environment variables from a .env file into process.env
require("dotenv").config();

// Import the Express.js library
// Import Mongoose, a MongoDB ODM library
const express = require("express");
const mongoose = require("mongoose");

// Initialize the Express application
const app = express();

/* is used to automatically parse JSON data in incoming request bodies and make it available as req.body.
 It’s commonly used in APIs where clients send data to the server in JSON format.f */
app.use(express.json());

// Set up the MongoDB database connection by imported database function
database(mongoose);

// Define the port number for the server to listen on, using the PORT environment variable or defaulting to 10
const port = process.env.PORT || 10;

app.use("/register", registerRouter);

// Start the Express server
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
