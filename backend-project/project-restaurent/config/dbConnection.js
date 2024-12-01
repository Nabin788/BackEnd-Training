const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE);
        console.log("Database connected sucessfully.");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

module.exports = dbConnect;