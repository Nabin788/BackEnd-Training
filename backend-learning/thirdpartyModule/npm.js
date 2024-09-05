const chalk = require("chalk");
const validator = require("validator");

let email = validator.isEmail("nabin@poudel.com");
console.log(email ? chalk.green('Valid Email') : chalk.red('Invalid Email'));
