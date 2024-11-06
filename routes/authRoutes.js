const express = require("express");
const {
  createNewUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  resetPassword,
  updateUserRole,
} = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware");
const {
  getAllUsers,
  getUserByUsername,
  deleteUser,
  updateUserByUsername,
} = require("../controllers/userController");
const router = express.Router();

// Public Routes
router.post("/register", createNewUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logoutUser);

// Admin Routes
router.put(
  "/update-user/:username",
  authenticateToken.protect,
  authenticateToken.adminOnly,
  updateUserByUsername
);
router.get(
  "/all-users",
  // authenticateToken.protect,
  // authenticateToken.adminOnly,
  getAllUsers
);
router.get(
  "/get-user/:username",
  authenticateToken.protect,
  authenticateToken.adminOnly,
  getUserByUsername
);
router.delete("/delete-user/:id", deleteUser);
router.put("/reset-password/:id", resetPassword);
router.put(
  "/update-role",
  authenticateToken.protect,
  authenticateToken.adminOnly,
  updateUserRole
);

module.exports = router;
