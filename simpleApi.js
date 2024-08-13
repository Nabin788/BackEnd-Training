const http = require("http");
const fs = require("fs");
require("url");

let port = 1000;

// Calling the json data from its path 
const data = fs.readFileSync(`${__dirname}/product.json`);

const server = http.createServer((req, res) => {
    if (req.url === "/" || req.urll === "/home") {
        res.end("Welcome home");
    } else if (req.url === "/product") {
        res.writeHead(200, {
            'content-type': 'application/json'
        });
        // sending the json data
        res.end(data);

    } else {
        res.statusCode = 404;
        res.end("Url not found");
    }

});

server.listen(port, () => {
    console.log(`server is listening from port no:${port}`);

})