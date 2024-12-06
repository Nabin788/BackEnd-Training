const jwt = require("jsonwebtoken");
const userModels = require("../model/userSchema.js");
require("dotenv").config();
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        const userId = decoded.id;

        const user = await userModels.findById(userId, { _id: 0, password: 0 });
        if (!user) {
            res.status(400).send({
                sucess: false,
                message: "Can not get user data."
            });
        }
        res.status(200).send({
            sucess: true,
            message: user
        });
    } catch (error) {
        console.log(error);

        res.status(500).send({
            sucess: false,
            message: "Failed to get user.",
            error
        });
    }
}

const updateUser = async (req, res) => {
    try {

        const { userName, email, phone, address } = req.body;

        const authorization = req.headers.authorization;
        const getUser = await authorization.split(" ")[1];
        const decode = jwt.verify(getUser, process.env.SECRETKEY);
        const userID = decode.id;

        const updates = {};
        if (userName) updates.userName = userName;
        if (email) updates.email = email;
        if (phone) updates.phone = phone;
        if (address) updates.address = address;

        const user = await userModels.findByIdAndUpdate(userID, { $set: updates }, { new: true, runValidators: true });

        if (!user) {
            return res.status(400).send({
                sucess: false,
                message: "User validation failed."
            });
        }

        await user.save();
        res.status(201).send({
            sucess: true,
            message: "Sucessfully update user"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: false,
            message: "Failed to update user"
        });
    }
}

const updateUserPassword = async (req, res) => {
    try {

        const { oldPassword, newPassword, confirmPassword } = req.body;

        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).send("Please provide required information");
        }

        if (newPassword != confirmPassword) {
            return res.status(400).send("new password and confirm password does not match")
        }

        const authorization = req.headers.authorization;
        const getUser = await authorization.split(" ")[1];
        const decode = jwt.verify(getUser, process.env.SECRETKEY);
        const userID = decode.id;

        const userPassword = await userModels.findById(userID);
        const getUserPassword = userPassword.password;

        const checkPassword = await bcrypt.compare(oldPassword, getUserPassword);

        if (!checkPassword) {
            return res.status(400).send({
                sucess: false,
                message: "Wrong password, Please provide valid password"
            });
        }

        const newUserPassword = await bcrypt.hash(newPassword, 10);

        const updatePassword = await userModels.findByIdAndUpdate(userID, { $set: { password: newUserPassword } });
        await updatePassword.save();
        res.status(201).send({
            sucess: true,
            message: "Sucessfully update user password"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: false,
            message: "Failed to update user password"
        });
    }
}

module.exports = { getUser, updateUser, updateUserPassword };