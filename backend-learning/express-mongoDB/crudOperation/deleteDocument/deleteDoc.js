const express = require("express");
const mongose = require("mongoose");
const app = express();

mongose.connect("mongodb://localhost:27017/bioInfo")
    .then(() => {
        console.log("Database connection is sucessfull");
    }).catch((err) => {
        console.error("Database connection is failed", err);
    });

    const schema = new mongose.Schema({
        name: String
    });

// create a collection
const biodata = new mongose.model("biodata", schema);


const displayDocument = async () => {

    // to delete document
    const deletedocument = await biodata.deleteOne({ name: "Siwan Poudel" });
    console.log(deletedocument);

    // to delete all document
    const deleteAlldocument = await biodata.deleteMany({});
    console.log(deleteAlldocument);

    // to read all document
    const document = await biodata.find();
    console.log(document);

    // to delete specific field in document we can use either deleteOne or deleteMany
    const deleteField = await biodata.updateOne({name: "basanta"}, {$unset: {name: ""}})
    console.log(deleteField);

    app.get("/", (req, res) => {
        res.send(document);
    });
}
displayDocument()

app.listen(2000, () => {
    console.log("server is running");
});

