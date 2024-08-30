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

const displayDocument = async () => {
    // to read all document
    const document = await multiCol.find();
    console.log(document);

    // to read specific document
    const specificDoc = await multiCol.find({name: "Siwan Poudel"})
    console.log(specificDoc);

    // to update specific field of document
    const updateField = await multiCol.updateOne({name: "Nabin Poudel"}, {$set: {address: "Rapti-01, Bhaluwang, Dang"}})
    console.log(updateField);

    // to update all field of document
    const updateAllFiled = await multiCol.updateMany({age: 24}, {$set: {active: false}})
    console.log(updateAllFiled);

    // to delete document
    const deletedocument = await multiCol.deleteOne({name: "Siwan Poudel"});
    console.log(deletedocument);

    // to delete all document
    const deleteAlldocument = await multiCol.deleteMany({});
    console.log(deleteAlldocument);
    
}
displayDocument()

app.listen(1000, () => {
    console.log("server is running");
});

