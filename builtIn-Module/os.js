// os built in module
const os = require("os");

// to get system architecture x64 or x32
let arc = os.arch();
console.log(arc);

// to get the clogical cpu information
let cpuInfo = os.cpus(); 
console.log(cpuInfo);

// to get the device name
let devName = os.hostname();
console.log(devName);

// it will get the os version or kernal version
let kernalV = os.version();
console.log(kernalV);

// it will get the device uptime means when device completely shutdown last or not used.
//  time will be in millisecond. 
let deviceOn = os.uptime();
// first 60 convert the tile into minute second convert into hour.
/* tofixed() method used yo extract the fixed decimal nuber by defining how many decimal need to get 
in the given code toFixed(2) get 2 decimal number*/
console.log((deviceOn / 60 / 60).toFixed(2));

//  it will get username and homedir
let user = os.userInfo()
console.log(user);

// it will give the total ram of the system
let ram = os.totalmem();
console.log(ram / 1024 / 1024/1024);

// it will get the available ram of system
let aRam = os.freemem();
console.log(aRam / 1024 / 1024 / 1024);

// it will get the network information like ip address, mac address etc
let network = os.networkInterfaces();
console.log(network);

