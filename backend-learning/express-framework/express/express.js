const exp = require("express");

const app = exp();

app.get("/", (req,res) => {
    res.send("Hello world");
});

app.get("/about", (req,res) => {
    res.send("Welcome to my about page");
});

app.listen(1000, () => {
    console.log("server is listening..");
    
})