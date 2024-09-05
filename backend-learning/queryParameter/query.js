const server = require("express");

const app = server();

app.get("/", (req, res) => {
    const myName = req.query.name;

    if (myName) {
        res.send(`Hello, ${myName}`);
    } else {
        res.send("welcome");
    }
});

app.listen(1000, () => {
    console.log("server is running");
});

// url http://localhost:1000/?name=Nabin
// output Hello, Nabin