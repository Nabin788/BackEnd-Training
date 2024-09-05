const http = require("http");
const fs = require("fs");

let server = http.createServer((req, res) => {
    let jsonData = {
        name: "nabin poudel",
        age: 24,
        address: "Bhalubang"
    }

    // converting object to json
    let objTojson = JSON.stringify(jsonData);

    fs.writeFile("json.json", objTojson, (err, data) => {
        console.log("sucessfully store json data in another file");
    });

    fs.readFile("json.json", "utf-8", (err, data) => {

        // converting json to object
        let jsonToobj = JSON.parse(data);
        res.end(data)
        console.log(jsonToobj);
    });
});

server.listen(1000, () => {
    console.log("Server is running.");
});