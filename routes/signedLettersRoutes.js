// routes/signedLetters.js
const express = require("express");
const multer = require("multer");
const signedLettersController = require("../controllers/signedLettersController");
const path = require("path");

const router = express.Router();

// File storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/signed_letters");
  },
  filename: (req, file, cb) => {
    const applicantName = req.body.applicantName.replace(/\s+/g, "_");
    const letterType = req.body.letterType.replace(/\s+/g, "_"); // Make sure to clean the letterType
    const currentDate = new Date().toISOString().split("T")[0];
    const fileExtension = path.extname(file.originalname);

    cb(null, `${applicantName}_${letterType}_${currentDate}${fileExtension}`);
  },
});

// Multer upload configuration with file filter and limits
const upload = multer({
  storage: storage,
  limits: { fileSize: 3 * 1024 * 1024 }, // Limit file size to 3 MB
  fileFilter: (req, file, cb) => {
    const fileType = file.mimetype;
    const validTypes = ["application/pdf"]; // Only allow PDF files

    if (validTypes.includes(fileType)) {
      cb(null, true); // Accept file
    } else {
      cb(new Error("Only PDF files are allowed."), false); // Reject file
    }
  },
});

router.get("/signed-letters", signedLettersController.getSignedLetters);
router.post(
  "/upload-signed-letters",
  upload.single("file"),
  signedLettersController.uploadSignedLetter
);

// New DELETE route for signed letters
router.delete(
  "/signed-letters/:id",
  signedLettersController.deleteSignedLetter
);

module.exports = router;
