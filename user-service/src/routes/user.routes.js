const express = require("express");
const router = express.Router();
const {
  createProfile,
  getProfile,
  updateProfile,
  getAllUsers,
  deleteProfile,
} = require("../controller/user.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/", authMiddleware, createProfile);
router.get("/", authMiddleware, getAllUsers);
router.get("/:userId", authMiddleware, getProfile);
router.put("/:userId", authMiddleware, updateProfile);
router.delete("/:userId", authMiddleware, deleteProfile);

module.exports = router;
