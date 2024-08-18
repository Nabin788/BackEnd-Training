const server = require("http");

let myServer = server.createServer((req, res) => {
    res.end("Welcome to my first server");
});

myServer.listen(1000, "127.0.0.1", () => {
    console.log("server is listening from 1000");
})