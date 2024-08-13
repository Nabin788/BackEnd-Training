const fs = require("fs");

// Create a new file 
const file = fs.writeFileSync("syscFile.txt",  "Hello sychronous file system");
console.log(file);

// append the new text in the given file text
const appendText = fs.appendFileSync("syscFile.txt", ". My name is Nabin Poudel.");
console.log(appendText);

// read text from file
const readFile = fs.readFileSync("syscFile.txt", "UTF-8")
console.log(readFile);




