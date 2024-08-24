//  require module
const EventEmitter = require("events");

// creating object instance
const event = new EventEmitter();

// event define
// event.on("myName", (stCode, status ) => {
event.on("myName", () => {
    console.log("Hello World");    
});

event.emit("myName");
//  we an also pass the argument 
// event.emit("myName", 200, "ok");
