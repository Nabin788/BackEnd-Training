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
    // to read all document
    const document = await biodata.find();
    // console.log(document);

    // to read specific document
    const specificDoc = await biodata.find({name: "Siwan Poudel"});
    // console.log(specificDoc);

    // to read specific field
    const specifiField = await biodata.findOne({name: "nabin"}, {name:1});
    console.log(specifiField);
    


    app.get("/", (req, res) => {
        res.send(document);
    });
    
}
displayDocument();

app.listen(3000, () => {
    console.log("server is running");
});

