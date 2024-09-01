const mongoose = require("mongoose");
const validator = require("validator");
// establish database connection or create a database 
mongoose.connect("mongodb://localhost:27017/testApi").then(() => { 
    console.log("Database conneted sucessfully.");
}). catch((error)  => {
    console.error("Database connection is failed", error);
});

// create Schema for field structure
const fieldSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        required: true,
    },
    email: {
        type: String,
        minLength: 13,
        required: true,
        // unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email.");
            }
        }
    },
    password: {
        type: String,
        minLength: 8,
        // unique: true,
        required: true,
    }
});

// create collection
const testCollection = new mongoose.model("testCollection", fieldSchema);

module.exports = testCollection;
