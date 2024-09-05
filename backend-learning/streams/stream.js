const fs = require("fs");
const http = require("http");

const server = http.createServer();
// we can used either this
server.on("request", (req, res) => {
    fs.readFile("input.txt", (err, data) => {
        res.end(data);
    });
});

// or this
server.on("request", (req, res) => {
    const file = fs.createReadStream("input.txt");

    // it will read the data from input.txt file and display chunk data
    file.on("data", (currData) => {
        res.write(currData);
    });

    // it will  display the data if there is an no more data to read
    file.on("end", () => {
        res.end();
    });

    // it will display the error if there is any error in the file 
    file.on("error", (error) => {
        res.end("file not found")
        console.error(error);
    });
});

// or this
server.on("request", (req, res) => {
    const rStream = fs.createReadStream("input.txt");
    rStream.pipe(res);
});

server.listen(1000, () => {
    console.log("server is listening");

});