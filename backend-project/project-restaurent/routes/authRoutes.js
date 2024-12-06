const express = require("express");
const router = express.Router();
const {userLogin, userRegister} = require("../controllers/authController.js");
const authUser = require("../middleware/authMiddleware.js");
const {getUser, updateUser, updateUserPassword} = require("../controllers/userController.js")

router.post("/register", userRegister);
router.post("/login",userLogin);
router.get("/home", authUser, getUser);
router.put("/update", authUser, updateUser);
router.post("/update/password", authUser, updateUserPassword);
module.exports = router;