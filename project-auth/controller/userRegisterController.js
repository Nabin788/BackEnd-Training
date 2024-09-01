const { UserModel } = require('../models/userRegisterModels.js');

// using middleware to hash password and compare
const userController = async (req, res) => {

    try {
        const { name, email, password, confirmPassword } = req.body;
        const dbEmail = await UserModel.findOne({ email: email }, { email: 1 });

        if (dbEmail) {
            res.status(404).send("email is already present");
        } else if (password != confirmPassword) {
            res.status(404).send("password not match")
        } else {
            // creating modles name Register and it should be in PascalCase
            const userDoc = new UserModel({
                name,
                email,
                password,
                confirmPassword,
            });
            await userDoc.save();
            res.status(201).send("User register sucessfully")
        }
    } catch (error) {
        console.error(error);
        
    }
}
module.exports = userController;