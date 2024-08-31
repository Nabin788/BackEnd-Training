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
    console.log(document);

    // to read specific document
    const specificDoc = await biodata.find({ name: "Siwan Poudel" });
    console.log(specificDoc);

    // to read specific field
    const specifiField = await biodata.findOne({ name: "nabin" }, { name: 1 });
    console.log(specifiField);

    //! Operator

    // to read the conditon field like if the value is greater then other field
    const gtField = await biodata.find({ age: { $gt: 23 } })
    console.log(gtField);

    // to read the condition field like if the value is less then other
    const lsField = await biodata.find({ age: { $lt: 24 } });
    console.log(lsField);

    // to get the multiple field 
    const mulField = await biodata.find({ name: { $in: ["madhuSudan", "basanta"] } })
    console.log(mulField);

    // to get either or match the give condition using logiocal or operator
    const orMatch = await biodata.find({ $or: [{ address: "pokhara" }, { name: "nabin" }] }).select({ name: 1 })
    console.log(orMatch);

    // to get field match the give condition using logiocal and operator
    const andMatch = await biodata.find({ $and: [{ address: "pokhara" }, { age: 24 }] }).select({ name: 1 })
    console.log(andMatch);

    // to get remaining field or document if the condition match logiocal nor operator
    const norMatch = await biodata.find({ $nor: [{ address: "pokhara" }, { name: "nabin" }] }).select({ name: 1 })
    console.log(norMatch);

    //! Operator


    app.get("/", (req, res) => {
        res.send(document);
    });

}
displayDocument();

app.listen(3000, () => {
    console.log("server is running");
});

