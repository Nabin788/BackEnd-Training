const UserModel = require("../models/userRegisterModels.js");

const userController = async (req, res) => {

    const { name, email, password, confirmPassword } = req.body;

    try {
        // Create a new user document
        const userDoc = new UserModel({
            name,
            email,
            password,
            confirmPassword,
        });

        // Save the document in the database
        await userDoc.save();
        res.status(201).send("User registration successful");
    } catch (error) {
        res.status(500).send({ message: "Failed to process registration", error: error.message });
        console.log(error);

    }
};

module.exports = userController;
