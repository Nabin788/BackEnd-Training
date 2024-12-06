const userModels = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer");

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
        const userInfo = await userModels.findOne({ email });
        if (!userInfo) {
            return res.status(400).send({
                sucess: false,
                message: "Failed to login user. Please provide valid user email and password"
            });
        }

        const userEmail = userInfo.email;
        const userPassword = userInfo.password;

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

const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModels.findOne({ email });
        if (!user) {
            return res.status(400).send("user not found");
        }

        const userEmail = user.email;
        const userOTP = user.otp;
        const userId = user._id;
        if (userEmail != email) {
            return res.status(400).send("Please Enter valid email number");
        }

        const otpCode = Math.floor(10000 * Math.random());
        const expireAt = Date.now() + 2 * 60 * 1000;
        const remainingTime = Math.ceil((expireAt - Date.now()) / (60 * 1000));

        const mail = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const userContent = ({
            from: process.env.EMAIL,
            to: email,
            subject: "Reset Your Password",
            html: `<h1>Your OTP to reset password: ${otpCode}. Please used given otp before ${remainingTime} minutes</h1>`
        });
        const getOTP = await mail.sendMail(userContent);
        if (!getOTP) {
            return res.status(400).send({
                sucess: false,
                message: "failed to get otp. please try again"
            });
        }

        user.otp = otpCode;
        user.otpExpiresAt = expireAt;
        await user.save();

        res.status(201).send({
            sucess: true,
            message: "sucessfully send otp to your gmail."
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to send reset OTP on your gamil.");
    }
}

const resetPassword = async (req, res) => {
    try {
        
        const { otp, newPassword, confirmPassword } = req.body;

        if(!otp || !newPassword || !confirmPassword){
            return res.status(400).send("Please provide required information.");
        }

        const userOtp = await userModels.findOne({ otp });

        if (!userOtp) {
            return res.status(400).send("Incorrect otp");
        }

        if (newPassword != confirmPassword) {
            return res.status(400).send("confirm password not match.");
        }

        const userId = userOtp._id;
        const newUserPassword = await bcrypt.hash(newPassword, 10);

        await userModels.findByIdAndUpdate(userId, { $set: {password: newUserPassword }});

        res.status(201).send({
            sucess: true,
            message: "sucessfully reset password"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to reset your password.");
    }
}

module.exports = { userRegister, userLogin, updateUserPassword, sendOTP , resetPassword };