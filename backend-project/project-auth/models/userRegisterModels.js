const mongoose = require("mongoose");
const database = require("../database/database.js");
const bcrypt = require("bcrypt");
database();

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 12,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },
    confirmPassword: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },
});

userSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            if (this.password != this.confirmPassword) {
                throw new Error("confirm password not match");
            }
            this.password = await bcrypt.hash(this.password, 10);
            this.confirmPassword = await bcrypt.hash(this.confirmPassword, 10);

            this.confirmPassword = undefined;
            next();
        }

    } catch (error) {
        next(error);
    }
});

const UserModel = new mongoose.model("UserModel", userSchema);

module.exports = UserModel;