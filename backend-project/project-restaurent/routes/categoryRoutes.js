const express = require("express");
const router = express.Router();
const { sendCategory, deleteCategory, updatesCategory, getCategory } = require("../controllers/categoryController");
const authUser = require("../middleware/authMiddleware");

router.post("/category", authUser, sendCategory);
router.delete("/category/:id", authUser, deleteCategory)
router.get("/category/:id", authUser, getCategory);
router.put("/category/:id", authUser, updatesCategory);

module.exports = router;