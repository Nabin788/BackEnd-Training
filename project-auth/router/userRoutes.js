// creating router
const express = require("express");
const router = express.Router();
const userController  = require("../controller/userRegisterController.js");

router.post("", userController);

module.exports = router;