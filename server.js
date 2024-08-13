// calling build in module by using require keyword
const server = require("http");
// we can also given method if the module have not require to use from the variable.
require("url");
// defining port number local variable
let port = 1000;

// creating server which content two req and res.
let start = server.createServer((req, res) => {
    let route = req.url;

    // defining url in the condition for appropriate response
    if (route === "/" || route === "/home") {
        // res.end send the data
        res.end("Hello, welcome to my home page.");
    } else if (route === "/about") {
        res.end("welcome to my about page");
    } else {
        // res.writeHead use to define the status code and as well as other data on the headers within a http network
        res.writeHead(404, {
            'content-type' : 'js',
            'my-content': 'nabin poudel'
        })
        res.end("sorry url not found");
    }
});

// listening port to execute the server on the given or defined port
start.listen(port, () => {
    console.log(`My firt server is running on: ${port}`);
})