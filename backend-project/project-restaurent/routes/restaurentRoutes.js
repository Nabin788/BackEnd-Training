const express = require("express");
const router = express.Router();
const authUser = require("../middleware/authMiddleware.js");
const { restaurentController, getRestaurent, deleteRestaurent } = require("../controllers/restaurentController.js");

router.post("/restaurent", authUser, restaurentController);
router.get("/restaurent", authUser, getRestaurent);
router.get("/restaurent/:id", authUser, getRestaurent);
router.delete("/restaurent/:id", authUser, deleteRestaurent);

module.exports = router;