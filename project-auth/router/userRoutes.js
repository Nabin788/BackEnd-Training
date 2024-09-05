const express = require("express");
const userRegisterController = require("../controller/userRegisterController.js");
const router = express.Router();

router.post("/register", userRegisterController);

module.exports = router;