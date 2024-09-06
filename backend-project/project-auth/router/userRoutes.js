const express = require("express");
const userRegisterController = require("../controller/userRegisterController.js");
const userLoginController = require("../controller/userLoginController.js");
const userChangedPassword = require("../controller/userChangePassword.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const {sendPasswordLink, changePassword} = require("../controller/userResetPassword.js");
const router = express.Router();

router.post("/register", userRegisterController);
router.post("/login", userLoginController);
router.put("/update",authMiddleware, userChangedPassword);
router.post("/resetLink", sendPasswordLink);
router.post("/reset/:id/:token", changePassword);

module.exports = router;