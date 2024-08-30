const express = require("express");
const mongose = require("mongoose");
const app = express();

mongose.connect("mongodb://localhost:27017/multiCollection")
    .then(() => {
        console.log("Database connection is sucessfull");
    }).catch((err) => {
        console.error("Database connection is failed", err);
    });

// create a collection
const multiCol = new mongose.model("multiCol", new mongose.Schema);


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

app.listen(2000, () => {
    console.log("server is running");
});
