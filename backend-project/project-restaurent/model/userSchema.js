const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Enter user name"],
    },
    email: {
        type: String,
        required: [true, "Enter your email address"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password."],
    },
    address: {
        type: Array
    },
    phone: {
        type: String,
        required: [true, "Enter your phone number"]
    },
    userType: {
        type: String,
        required: [true, "User type is required"],
        default: "client",
        enum: ["client", "admin", "driver", "vendor"],
    },
    profile: {
        type: String,
        default: "https://th.bing.com/th/id/OIP.awAiMS1BCAQ2xS2lcdXGlwHaHH?w=182&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    },
},
    { timestamps: true }
);

const userModels = mongoose.model("USER", userSchema);

module.exports = userModels;