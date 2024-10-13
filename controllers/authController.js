require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

//Generating a jwt
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

//Generating a jwt refresh token
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
  );
};

// New user registration
exports.createNewUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Checking if the user already exists
    const existingUserEmail = await User.findOne({ where: { email } });
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUserEmail) {
      throw new Error("Email provided has an existing account already");
    } else if (existingUsername) {
      throw new Error("Username is already in use");
    }
    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating the new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    throw new Error(`Error creating user. ${error.message}`);
  }
});

// Login user
exports.loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  try {
    // Checking if the user exists
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid Username. Please try again" });
    }

    // Comparing the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Incorrect Password. Please try again" });
    }

    const accessToken = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refreshToken to the user's record in the database
    user.refreshToken = refreshToken;
    await user.save();

    // Set the refresh token as a secure HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only secure in production
      sameSite: "Strict", // CSRF protection
      // path: "/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days limit for refresh token
    });

    // Return the access token in the response body
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken,
      },
    });
  } catch (error) {
    res.status(500).json({ message: `Login Failed. ${error.message}` });
  }
});

// Refresh token route
exports.refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(403).json({ message: "Refresh token required" });
  }

  // Find user with the given refresh token
  const user = await User.findOne({ where: { refreshToken } });
  if (!user) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    // Generating new access token
    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({ accessToken });
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
});


//FIXME: Come back and check on the logout functionality
// Logout functionality
exports.logoutUser = asyncHandler(async (req, res) => {
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  const { userId } = decoded.id; // userId is retrieved from the decoded token in authenticateToken

  // Find the user and remove the refresh token
  const user = await User.findByPk(userId);
  if (user) {
    user.refreshToken = null;
    await user.save();
    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "Logged out successfully" });
  } else {
    return res.status(400).json({ message: "User not found" });
  }
});
