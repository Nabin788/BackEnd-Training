// Import express, socket.io, http and path module 
const express = require("express");
const http = require("http");
const socket = require("socket.io");
const path = require("path");

// instance of express server
const app = express();
const server = http.createServer(app);
const io = socket(server);

// define front end route
const public = path.join(__dirname, "./public");
app.use(express.static(public));
app.use(express.json());

// define port
const port = 2020;

// Root route
app.get("/", (req, res) => {
    res.sendFile("index");
});

// established socket connection
io.on("connection", (client) => {
    console.log("Client Connected to server");

    // data send from server to client
    client.emit("message", "Welcome to my chat app client");

    // received data from client
    client.on("client_message", (message) => {
        console.log(message);
    });

    // client disconnected from server
    client.on("disconnect", () => {
        console.log("Client disconnected from server");
        
    })
});

// listen server
server.listen(port, () => {
    console.log(`http://localhost:${port}`);
});