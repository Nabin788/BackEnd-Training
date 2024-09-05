const UserModel = require("../models/userRegisterModels.js");
const bcrypt = require('bcrypt');

const cchangePassword = async (req, res) => {
    try {
        let { email, password, newPassword, confirmPassword } = req.body;

        const dbEmail = await UserModel.findOne({ email: email });

        const comparePassword = await bcrypt.compare(password, dbEmail.password);

        if (!comparePassword) {
            return res.status(400).send("invalid email or password");
        }

        if (newPassword != confirmPassword) {
            return res.status(400).send("confirm password not match");
        }

        password = await bcrypt.hash(newPassword, 10);
        const updatePassword = await UserModel.findOneAndUpdate({ email: email }, { $set: { password: password } });
        res.status(200).send("Changed password sucessfully.");

    } catch (error) {
        res.status(500).send(error);
        console.error(error);
    }

}

module.exports = cchangePassword;
