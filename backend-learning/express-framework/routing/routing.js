const express = require("express");
const app = express(); 

const port = 1000;

app.get("/", (req, res) => {
    res.send("Welcome to my home page");
});

app.get("/home", (req, res) => {
    res.send("Welcome to my home page");
});

app.get("/about", (req, res) => {
    res.send("welcome to my about page");
});

app.listen(port, () => {
    console.log(`Server is listening from port: ${port}`);
});