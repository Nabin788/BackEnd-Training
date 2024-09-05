const UserModel = require("../models/userRegisterModels.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const dbEmail = await UserModel.findOne({ email: email });

        if (!dbEmail) {
            return res.status(400).send("Invalid email or password.");
        }

        const hashPassword = await bcrypt.compare(password, dbEmail.password);

        if (!hashPassword) {
            return res.status(400).send("Invalid email or password.");
        }

        const token = jwt.sign({id: dbEmail._id}, process.env.SECRET_KEY, {expiresIn: "5d"});
        res.status(200).send({ message: "user login sucessfully", token: token});

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }

}

module.exports = loginUser;