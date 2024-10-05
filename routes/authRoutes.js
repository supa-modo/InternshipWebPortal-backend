const express = require('express');
const { createNewUser, loginUser, refreshAccessToken, logoutUser } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');
const { getAllUsers, getUserByUsername, deleteUser, updateUserByUsername } = require('../controllers/userController');
const router = express.Router();

router.post('/register', createNewUser);
router.post('/login', loginUser);
router.put('/update-user/:username', authenticateToken.protect, authenticateToken.adminOnly, updateUserByUsername);
router.get('/all-users', authenticateToken.protect, authenticateToken.adminOnly, getAllUsers);
router.get('/get-user/:username', authenticateToken.protect, authenticateToken.adminOnly, getUserByUsername);
router.delete('/delete-user/:username', authenticateToken.protect, authenticateToken.adminOnly, deleteUser);
router.post('/refresh', refreshAccessToken);
router.put('/logout/:username', logoutUser);

module.exports = router;