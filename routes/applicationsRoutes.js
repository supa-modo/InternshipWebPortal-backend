const authenticateToken = require("../middleware/authMiddleware");
const upload = require("../config/uploadsConfig.js");


const express = require("express");
const {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication,
  getFilteredApplications,
  getApplicationsStats,
} = require("../controllers/internApplicationController.js");
const router = express.Router();

router.post(
  "/apply-internship",
  upload.fields([
    { name: "academicDocuments", maxCount: 1 },
    { name: "identificationDocument", maxCount: 1 },
    { name: "insuranceDocument", maxCount: 1 },
  ]),
  createApplication
);
router.get("/all-applications", getApplications);
router.get("/filtered-applications", getFilteredApplications);
router.get("/applications-stats", getApplicationsStats);
router.put("/update-application/:idPassportNumber", updateApplication);
router.delete("/delete-application/:idPassportNumber", deleteApplication);

module.exports = router;
