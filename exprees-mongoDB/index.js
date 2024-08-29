const server = require("express");
const mongoose= require("mongoose");

mongoose.connect("mongodb://localhost/27017/testConnection")
.then(() => {
    console.log("connection is sucessfull");
}). catch (err => {
    console.log("database connection is failed", err);
});

const app = server();

app.listen(1000, () => {
    console.log("server is running on: 1000");
});