// Import express, socket.io, http and path module 
const express = require("express");
const http = require("http");
const socket = require("socket.io");
const path = require("path");


// instance of express server
const app = express();
const server = http.createServer(app);
const io = socket(server);

// define port
const port = 2020;

// Root route
app.get("/", (req,res) => {
    res.send("Chat App");
});

// listen server
server.listen(port, () => {
    console.log(`http://localhost:${port}`);
});