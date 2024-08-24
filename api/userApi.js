const http = require("http");
const fs = require("fs");

const port = 1000;

const server = http.createServer((req, res) => {
    // read data from another file
    let apidata = fs.readFileSync("userApi.json", "utf-8");

    // convert to object
    let originalData = JSON.parse(apidata);

    // error jandling
    try {
        // loop to get each data from object
        originalData.forEach(element => {
            // object distruction
            let { name, price } = element;
            // to get all required data
            res.write(`My Mobile ${name} price is : ${price} \n`);
        });
        // to called res
        res.end();
    } catch (error) {
        console.error("not found", error);
    }


});

server.listen(port, () => {
    console.log(`server is listening from port number: ${port}`);
});