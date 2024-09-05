const express = require("express");
const testCollection = require("./database/mongose");

const app = express();

// to get the post data
app.use(express.json());

const port = process.env.PORT || 10;

// ! create
// create a document from postman send the field of document to database
app.post("/testData", async (req, res) => {
    try {
        const inserDocument = testCollection(req.body);
        const saveDocument = await inserDocument.save()
        res.send(saveDocument);
    } catch (err) {
        res.status(404).send(err);
        console.log("failed to save data", err);
    }
});
// ! create

//? we can used any field to do CRUD operation.
// * by using id we can read or delete or updae specific document
// ! read
// get the document from database
app.get("/testData", async (req, res) => {
    try {
        let getDocument = await testCollection.find();
        res.send(getDocument);
    } catch (err) {
        res.status(404).send("failed to get document");
        console.log("failed to get document from database");
    }
});


// get the specific document or field by id
app.get("/testData/:id", async (req, res) => {
    try {
        let getDocById = req.params.id;
        let getDocument = await testCollection.find({ _id: getDocById });
        res.send(getDocument);
        console.log(getDocument);

        // get the specific document or field name by id
        let getName = await testCollection.find({ _id: getDocById }, { name: 1 });
        // res.send(getName);
        // console.log(getName);


    } catch (err) {
        res.status(404).send("failed to get document");
        console.log("failed to get document from database");
    }
});


// get the document or field from name
app.get("/testData/name/:name", async (req, res) => {
    let getNameFromname = req.params.name;
    const getName = await testCollection.find({ name: getNameFromname }, { name: 1 });
    res.send(getName);
    console.log(getName);
});
// ! read

// ! update

// update the field or document from postman
app.put("/testData/name/:name", async (req, res) => {
    try {
        const updateNameFromName = req.params.name;
        // updateOne update first document of match field and updateMany update all document of match field
        const update = await testCollection.updateMany({ name: updateNameFromName }, req.body);
        res.send(update);
    } catch (error) {
        res.status(404).send("something went wrong");
    }
});
// ! update

// ! delete

// delte the document or field 
app.delete("/testData/delete/:id", async (req, res) => {
    try {
        const deleteDocument = req.params.id;
        const deleteMyDoc = await testCollection.deleteOne({ _id: deleteDocument });
        res.send(deleteMyDoc);
    } catch (error) {
        res.status(404).send("something went wrong");
    }
});

app.patch("/testData/delete/:name", async (req, res) => {
    try {
        // delete the specific field
        const deleteField = req.params.name;
        const deleteSpecField = await testCollection.updateOne({ name: deleteField }, {$unset: req.body})
        res.send(deleteSpecField);
    } catch (error) {
        res.status(404).send("something went wrong");
    }
});
// ! delete






app.listen(port, () => {
    console.log(`server is running on port number: ${port}`);
});