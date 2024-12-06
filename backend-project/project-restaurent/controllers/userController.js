const jwt = require("jsonwebtoken");
const userModels = require("../model/userSchema.js");
require("dotenv").config();

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

module.exports = { getUser, updateUser };