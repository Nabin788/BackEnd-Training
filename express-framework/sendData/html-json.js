const express = require("express");
const app = express();

const port = 1000;

app.get("/", (req, res) => {
    res.send("<h1>Welcome to my home page</h1>");
});

// while sending json data we can also used res.json().
// the differene of using res.json() is that it send null and undefine value as an json
app.get("/json", (req, res) => {
    res.status(200).send({
        id:1,
        names: "nabin poudel"
    });
});

app.listen(port, () => {
    console.log(`server is listening from port:`, port);
    
})