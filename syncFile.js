// require modeul for file system
const fs = require("fs");

//  it will write the text on define file name or create the define file name having that text if filename not present.
fs.writeFileSync("sync.txt", "Hello synchronous file system.");

//  it will add another text on presented text. 
fs.appendFileSync("sync.txt", " My name is Nabin Poudel.");

/*  it will read the data from define file and utf-8 encoded original written data from that file.
because without utf it presented buffer data */
let read = fs.readFileSync("sync.txt", "utf-8");
console.log(read);





