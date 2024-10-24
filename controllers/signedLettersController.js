// controllers/signedLettersController.js
const SignedLetter = require("../models/signedLetters");
const path = require("path");
const fs = require("fs");

exports.getSignedLetters = async (req, res) => {
  try {
    const letters = await SignedLetter.findAll();
    res.json(letters);
  } catch (error) {
    console.error("Error fetching signed letters:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.uploadSignedLetter = async (req, res) => {
  const { applicantName, department, letterType } = req.body;
  const file = req.file;

  if (!file) {
    return res
      .status(400)
      .json({ error: "No file uploaded or invalid file type." });
  }

  const fileName = file.filename; // Store the uploaded file name

  try {
    const newLetter = await SignedLetter.create({
      applicantName,
      department,
      letterType,
      fileName,
    });
    res.status(201).json(newLetter);
    console.log("Request body:", req.body);
  } catch (error) {
    console.error("Error uploading signed letter:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// New method for deletion
exports.deleteSignedLetter = async (req, res) => {
  const { id } = req.params;

  try {
    const letter = await SignedLetter.findByPk(id);
    if (!letter) {
      return res.status(404).json({ error: "Signed letter not found." });
    }

    // Delete the file from the filesystem
    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      "signed_letters",
      letter.fileName
    );
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      }
    });

    // Delete the record from the database
    await letter.destroy();
    res.status(200).json({ message: "Signed letter deleted successfully." });
  } catch (error) {
    console.error("Error deleting signed letter:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
