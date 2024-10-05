const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// Middleware to verify token and admin role
exports.protect = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        throw new Error('Not authorized, Invalid token attached');
    }

    try {
        // Verification of token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findByPk(decoded.id); // Corrected from 'decoded.userId' to 'decoded.id'

        if (!req.user) {
            throw new Error('Not authorized. User not found, check your credentials');
        }

        next();
    } catch (error) {
        throw new Error('Authentication failed, invalid token');
    }
});

// Middleware to check if the user is an admin
exports.adminOnly = asyncHandler(async (req, res, next) => {
    if (req.user.role !== 'admin') {
        throw new Error('Access denied, Admins Only');
    }

    next();
});
