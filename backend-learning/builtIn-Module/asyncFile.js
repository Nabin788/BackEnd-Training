const fs = require("fs");

//  it will write the text on define file name or create the define file name having that text if filename not present.
fs.writeFile("asyncFile.txt", "Hello asynchronous file system.", (err, data) => {
    console.log("file created sucessfully");
});

//  it will add another text on presented text. 
fs.appendFile("asyncFile.txt", " My name is Nabin Poudel.", (err ,data) => {
    console.log("another text added sucessfully");
});

/*  it will read the data from define file and utf-8 encoded original written data from that file.
because without utf it presented buffer data */
fs.readFile("asyncFile.txt", "utf-8", (err, data) => {
    console.log(`Text present in given file are: ${data}`);
})

// deleted the file
fs.unlink(("asyncFile.txt"), () => {
    console.log("file deleted sucessfully");
})

