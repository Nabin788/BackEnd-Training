const mongoose = require("mongoose")
const restaurentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide restaurent name. "],
        trim: true
    },
    imageUrl: {
        type: String,
        required: [true, "Please insert retaurent Image"],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    star: {
        type: Number,
        min: 1,
        max: 5
    },
    Comment: {
        type: String,
        trim: true
    }
},
    { timestamps: true }
);

const restaurentModel = mongoose.model("Restaurent", restaurentSchema);

module.exports = restaurentModel;