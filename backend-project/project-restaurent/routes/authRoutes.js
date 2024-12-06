const express = require("express");
const router = express.Router();
const { userLogin, userRegister, updateUserPassword, resetPassword, sendOTP } = require("../controllers/authController.js");
const authUser = require("../middleware/authMiddleware.js");
const { getUser, updateUser } = require("../controllers/userController.js")

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/home", authUser, getUser);
router.put("/update", authUser, updateUser);
router.post("/update/password", authUser, updateUserPassword);
router.post("/reset/password", resetPassword);
router.post("/send/otp", sendOTP);
module.exports = router;