const server = require("express");
const mongoose = require("mongoose");

const app = server();


// stablish database conection
mongoose.connect("mongodb://localhost:27017/bioInfo")
    .then(() => {
        console.log("connection is sucessfull");
    }).catch(err => {
        console.log("database connection is failed", err);
    });

// create a schema for what type of value should hold the field key
const dataType = new mongoose.Schema({
    name: String,
    age: BigInt,
    address: String,
    active: Boolean
});

// create a model for collection which contain collection name
// collection is save in small letter and in the database it will place the plural s in the collection name
// ex: BioData will be save on database as an biodatas
const BioData = new mongoose.model("BioData", dataType);

//  insert field on collection and create document
const bioField = new BioData({
    name: "nabin",
    age: 24,
    address: "Bhalubang",
    active: true
});

const bioField1 = new BioData({
    name: "siwan",
    age: 24,
    address: "Bhalubang",
    active: true
})

// used to save the document field on collection without this only collection will create
const proiseHandle = async () => {
   await BioData.insertMany([bioField,bioField1]);
}

proiseHandle()

app.get("/", (req, res) => {
    res.send(bioField);
});

app.listen(1000, () => {
    console.log("server is running", 1000);
});