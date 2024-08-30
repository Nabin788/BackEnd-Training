const express = require("express");
const mongose = require("mongoose");
const app = express();

mongose.connect("mongodb://localhost:27017/multiCollection")
    .then(() => {
        console.log("Database connection is sucessfull");
    }).catch((err) => {
        console.error("Database connection is failed", err);
    });

//  create a schema
const multiColSchema = new mongose.Schema({
    name: String,
    age: Number,
    address: String,
    Date: {
        type: Date,
        default: Date.now()
    },
    active: Boolean
});

// create a collection
const multiCol = new mongose.model("multiCol", multiColSchema);

// create a document
const databaseHandle = async () => {

    try {
        const docOne = new multiCol({
            name: "Nabin Poudel",
            age: 24,
            address: "Bhaluwang",
            active: true
        });

        const docTwe = new multiCol({
            name: "Siwan Poudel",
            age: 24,
            address: "Pokhara",
            active: true
        });

        const savedocument = await multiCol.insertMany([docOne, docTwe]);

        app.get("/", (req, res) => {
            res.send(savedocument);
        });

    } catch (error) {
        console.error("document is not used fixed schema type", error);
    }
}

databaseHandle();

app.listen(1000, () => {
    console.log("server is running");
});

