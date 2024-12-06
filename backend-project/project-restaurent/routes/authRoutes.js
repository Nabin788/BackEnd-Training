const express = require("express");
const router = express.Router();
const { userLogin, userRegister, updateUserPassword, resetPassword, sendOTP, deleteUser } = require("../controllers/authController.js");
const authUser = require("../middleware/authMiddleware.js");
const { getUser, updateUser } = require("../controllers/userController.js")

router.get("/home", authUser, getUser);

router.post("/register", userRegister);
router.post("/login", userLogin);

router.post("/update/password", authUser, updateUserPassword);
router.post("/reset/password", resetPassword);
router.post("/send/otp", sendOTP);

router.delete("/delete/:id", authUser, deleteUser);

router.put("/update", authUser, updateUser);

module.exports = router;