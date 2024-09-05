const UserModel = require("../models/userRegisterModels.js");

const userController = async (req, res) => {

    const { name, email, password, confirmPassword } = req.body;
    const userEmail = await UserModel.findOne({email: email});
    if (userEmail) {
        return res.status(404).send("email is already registered. Please use new eamil address.");
    }

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
        console.log("user registration sucessfull");
        
    } catch (error) {
        res.status(500).send({ message: "Failed to process registration", error: error.message });
        console.log(error);

    }
};

module.exports = userController;
