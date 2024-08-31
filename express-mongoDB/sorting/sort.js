const express = require("express");
const mongose = require("mongoose");
const app = express();

mongose.connect("mongodb://localhost:27017/bioInfo")
    .then(() => {
        console.log("Database connection is sucessfull");
    }).catch((err) => {
        console.error("Database connection is failed", err);
    });

// create a collection
const biodata = new mongose.model("biodata", new mongose.Schema);


const displayDocument = async () => {

    // soreting to used sort the field value in accending order
    const sortField = await biodata.find({ $or: [{ age: 24 }, { age: 23 }] }).sort({ name: 1 })
    console.log(sortField);



    app.get("/", (req, res) => {
        res.send(document);
    });

}
displayDocument();

app.listen(4000, () => {
    console.log("server is running");
});

