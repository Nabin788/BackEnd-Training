const express = require("express");
const router = express.Router();
const authUser = require("../middleware/authMiddleware.js");
const { restaurentController, getRestaurent } = require("../controllers/restaurentController.js");

router.post("/restaurent", authUser, restaurentController);
router.get("/restaurent", authUser, getRestaurent);
router.get("/restaurent/:id", authUser, getRestaurent);

module.exports = router;