const express = require('express');
const { createApplication, getApplications } = require('../controllers/internApplicationController.js'); 
const router = express.Router();

router.post('/apply-internship', createApplication);
router.get('/all-applications', getApplications);

module.exports = router;
