const express = require("express");
const router = express.Router();
const {userLogin, userRegister} = require("../controllers/authController.js");
const authUser = require("../middleware/authMiddleware.js");
const userCon = require("../controllers/userController.js")

router.post("/register", userRegister);
router.post("/login",userLogin);
router.get("/home", authUser, userCon);

module.exports = router;