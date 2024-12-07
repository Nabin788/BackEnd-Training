const express = require("express");
const router = express.Router();
const authUser = require("../middleware/authMiddleware.js");
const restaurentController = require("../controllers/restaurentController.js");

router.post("/restaurent", authUser, restaurentController);

module.exports = router;