const fs = require("fs");

// to create a async file
fs.writeFile("asyncFile.txt", "Hello asynchronous file system.", (err, data) => {
});

// to add data on async file
fs.appendFile("asyncFile.txt", "My name is Nabin Poudel.", (err, data) => {
});

// read file text from file
const readfile = fs.readFile("asyncFile.txt", "utf-8", (err, data) => {    
    console.log(data);
});

