const express = require("express");
const app = express();

const port = 1000;

app.get("/", (req, res) => {
    res.send("<h1>Welcome to my home page</h1>");
});

app.get("/json", (req, res) => {
    res.send({
        id:1,
        names: "nabin poudel"
    });
})

app.listen(port, () => {
    console.log(`server is listening from port:`, port);
    
})