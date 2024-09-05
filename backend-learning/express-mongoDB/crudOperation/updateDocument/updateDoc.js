const express = require("express");
const mongose = require("mongoose");
const app = express();

mongose.connect("mongodb://localhost:27017/bioInfo")
    .then(() => {
        console.log("Database connection is sucessfull");
    }).catch((err) => {
        console.error("Database connection is failed", err);
    });

    const updateSchema = new mongose.Schema({
        address: String,
        name: String
    });

// create a collection
const biodata = new mongose.model("biodata", updateSchema);


const displayDocument = async () => {

    // to update specific field of document
    const updateField = await biodata.updateOne({ name: "nabin" }, { $set: { address: "Rapti-01, Bhaluwang, Dang" } })
    console.log(updateField);

    // to update specific field of document by id
    const updateFieldById = await biodata.updateOne({_id: "66d27e6bdfedf5bb0c6a4760"}, {$set: {name: "Nabin Poudel"}});
    console.log(updateFieldById);
    

    // to update all field of document
    const updateAllFiled = await biodata.updateMany({ age: 24 }, { $set: { active: false } })
    console.log(updateAllFiled);

    // to read all document
    const document = await biodata.find();
    console.log(document);
}
displayDocument()

app.listen(2000, () => {
    console.log("server is running");
});

