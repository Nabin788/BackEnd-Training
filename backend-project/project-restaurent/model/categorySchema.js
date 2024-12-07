const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Category title is required"]
    },
    imageUrl: {
        type: String,
        default: "food.jpg"
    }
});

const category = mongoose.model("CATEGORY", categorySchema);

module.exports = category;