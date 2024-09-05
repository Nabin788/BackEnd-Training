const http = require("http");

let server = http.createServer((req, res) => {
    if (req.url === "/home" || req.url === "/") {
        // ? we can use res.write to send part of final body
        // res.write("hello");
        // res.write("world");
        // res.end();

        // ? we can use res.write to send final part body and closed the resonse
        res.end("welcome to my home page");
        // ? we cannot send another end 

    } else {
        //  we can define status code by directly calling it
        res.statusCode = 404;

        // or  we can used method to tell the header it's status code and status contenttype.
        //  normally content type is in document type
        res.writeHead(404, {"content-type": "text/html"});
        res.end("<h1> 404 url not found. </h1>");
    }

});

server.listen(1000, () => {
    console.log("server is running");
});