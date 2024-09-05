const server = require("express");
const app = server();
const path = require("path");


let paths = path.join(__dirname, "./public");

app.use(server.static(paths));

app.get("/" , (req, res) => {
    res.end();
});

app.listen(1000, () => {
    console.log("running");
});

