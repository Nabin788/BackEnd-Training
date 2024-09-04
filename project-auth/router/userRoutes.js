const express = require("express");
const userController = require("../controller/userRegisterController.js");
const router = express.Router();

router.post("/api", userController);

module.exports = router;