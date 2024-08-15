const path = require('path');

// it will get the path of the directory
let dirname = path.dirname("E:/Learning stuf/backEnd-Training/builtIn-Modul");
console.log(dirname);

// it will get the file extenstion
let ext  = path.extname("E:/Learning stuf/backEnd-Training/builtIn-Modul/path.js");
console.log(ext);

// it will get the information about root dir, full dir, base dir, ext 
let a = path.parse("E:/Learning stuf/backEnd-Training/builtIn-Modul");
console.log(a);
