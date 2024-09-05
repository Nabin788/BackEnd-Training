const names = "nabin";
console.log(names);

// !in the compilation process given code will wrape on anonymous function which is Immediately Invoke function Expression.
// ? which make the given code is private. Every code which is written in nodejs is private because in background
// * the code is wrapped by grouping operatora with anonumouse function which containe parameter require, module, 
// * __filename, __ dirname, exports.
// (function (exports, module, require, __filename, __dirname) {
//     const names = "nabin";
//     console.log(names);
// });