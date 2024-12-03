const userModels = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRegister = async (req, res) => {
    try {
        const { userName, email, password, phone, address } = req.body;
        if (!userName || !email || !password || !phone) {
            return res.status(500).send({
                sucess: false,
                message: "Please provide the required information"
            });
        }
        const existingUser = await userModels.findOne({ email });

        if (existingUser) {
            return res.status(500).send({
                sucess: false,
                message: "User already present in this email. Please try another email address"
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await userModels.create(
            {
                userName,
                email,
                password: hashPassword,
                address,
                phone
            });
        res.status(201).send({
            sucess: true,
            message: "User Created sucessfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: false,
            message: "User registration failed",
            error
        });
    }

}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(500).send({
                sucess: false,
                message: "Please provide required information"
            });
        }
        const userInfo = await userModels.findOne({ email });
        const userEmail = userInfo.email;
        const userPassword = userInfo.password;

        if (!userEmail) {
            return res.status(500).send({ message: "User does not exit from given information." });
        }

        const checkPassword = await bcrypt.compare(password, userPassword);

        if (!checkPassword) {
            return res.status(500).send({ message: "password not match" });
        }

        const getToken = jwt.sign({ id: userInfo._id }, process.env.SECRETKEY, {
            expiresIn: "7d"
        });
        res.status(200).send({
            sucess: true,
            message: "User login sucessfully",
            getToken,
        });
    } catch (error) {
        console.log("Falied to login:", error);
    }
}

module.exports = { userRegister, userLogin };