// Import express module 
const express = require("express");

// instance of express server
const app = express();

// define port
const port = 2020;

// Root route
app.get("/", (req,res) => {
    res.send("Chat App");
});

// listen server
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});