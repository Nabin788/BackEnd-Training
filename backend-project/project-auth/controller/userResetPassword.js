const UserModel = require("../models/userRegisterModels.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const sendPasswordLink = async (req, res) => {
    try {
        // get the user email for password reset
        const { email } = req.body;
        // check if the user is valid or not
        if (!email) {
            return res.status(401).send("email not found");
        }
        // get the user document from database if the user is valid
        const userEmail = await UserModel.findOne({ email: email });
        const id = userEmail._id;
        // generate new token from user email id and secret key
        const newToken = jwt.sign({ id: userEmail._id }, process.env.SECRET_KEY, { expiresIn: '10m' });

        // send reset link to user email address
        const link = `http://127.0.0.1:300/api/user/reset/${id}/${newToken}`;

        res.status(203).send("Sucessfully send link to your email address. plese check your email and reset the password");
        console.log(link);
    } catch (error) {
        res.status(203).send("failed to send reset link, Plese enter valid email address");
        console.error(error);
    }
}

const changePassword = async (req, res) => {
    try {
        const { password, confirmPassword } = req.body;
        const { id, token } = req.params;

        if (!token) {
            return res.status(203).send("User not found");
        }

        if (password !== confirmPassword) {
            return res.status(400).send('Confirm password not match');
        }

        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(404).send("Invalid token or expired toekn");
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const dbPassowrd = await UserModel.find({_id: id});
            if(dbPassowrd !== hashPassword){
                return res.status(400).send("Weak Password, use other password.");
            }

            const updatePassword = await UserModel.findOneAndUpdate({ _id: id }, { $set: { password: hashPassword } });

            if (!updatePassword) {
                return res.status(404).send("user not found");
            }

            res.send("password reset sucessfully");
        });

    } catch (error) {
        res.status(404).send("")
        console.error(error);

    }

}

module.exports = { sendPasswordLink, changePassword };

