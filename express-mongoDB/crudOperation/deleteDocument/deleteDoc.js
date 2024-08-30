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

    // to delete document
    const deletedocument = await multiCol.deleteOne({ name: "Siwan Poudel" });
    console.log(deletedocument);

    // to delete all document
    const deleteAlldocument = await multiCol.deleteMany({});
    console.log(deleteAlldocument);

    // to read all document
    const document = await multiCol.find();
    console.log(document);

    app.get("/", (req, res) => {
        res.send(document);
    });
}
displayDocument()

app.listen(2000, () => {
    console.log("server is running");
});

