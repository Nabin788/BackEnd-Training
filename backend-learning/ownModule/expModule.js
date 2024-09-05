//  In this module writing our own module like function define variable
const add = (a,b) => {
    return a-b;
}

const sub = (a,b) => {
    return a+b;
}

const name = "nabin";

//  exporting the value by object
module.exports = {add, sub, name};

