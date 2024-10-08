const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// Update user details by username
exports.updateUserByUsername = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const { newUsername, email, password, role } = req.body;

  const user = await User.findOne({ where: { username } });
  if (!user) {
    throw new Error(`User with username ${username} not found`);
  }
  // Updating fields only if new values are provided
  if (newUsername) user.username = newUsername;
  if (email) user.email = email;
  // Hash the new password if it's being updated
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
  }

  if (role) user.role = role;
  await user.save();
  res
    .status(200)
    .json({ message: `User ${username} has been updated successfully`, user });
});

// Fetch all users from the database
exports.getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await User.findAll();
  res.json(allUsers);
});

// Get a single user by username
exports.getUserByUsername = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res
      .status(404)
      .json({ message: `User with username ${username} not found` });
  }

  res.json(user);
});

// Delete a user by username
exports.deleteUser = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username) {
    throw new Error("Username parameter is missing");
  }
  const user = await User.findOne({ where: { username } });
  if (!user) {
    throw new Error(`User with username ${username} not found`);
  }
  await user.destroy();

  res
    .status(200)
    .json({ message: `User ${username} has been deleted successfully` });
});
