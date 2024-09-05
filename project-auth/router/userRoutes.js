const express = require("express");
const userRegisterController = require("../controller/userRegisterController.js");
const userLoginController = require("../controller/userLoginController.js");
const router = express.Router();

router.post("/register", userRegisterController);
router.get("/login", userLoginController);

module.exports = router;