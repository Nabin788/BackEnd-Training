const express = require("express");
const path = require("path");
const hbs = require("hbs");

const port = 1000;

const app = express();

// used to lookup view path
const viewPath = path.join(__dirname, "./template/views");

// used to get partials
const partialPath = path.join(__dirname, "./template/partial");

// used to get static file
app.use(express.static(viewPath));

// used to get view engine
app.set("view engine", "hbs");
// used to change views with view Path
app.set("views", viewPath);
// used to register partial
hbs.registerPartials(partialPath);

app.get("/" , (req, res) => {
    res.render("index");
});

app.get("/contact", (req,res) => {
    res.render("cantact");
});

app.listen(port, () => {
    console.log("server is listening from port number:", port);
});