const express = require("express");
const {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication,
} = require("../controllers/internApplicationController.js");
const router = express.Router();

router.post("/apply-internship", createApplication);
router.get("/all-applications", getApplications);
router.put("/update-application/:idPassportNumber", updateApplication);
router.delete("/delete-application/:idPassportNumber", deleteApplication);

module.exports = router;
