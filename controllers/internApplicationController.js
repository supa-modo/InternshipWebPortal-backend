const { Op } = require("sequelize"); // Import Sequelize operators
const InternshipApplications = require("../models/internshipApplications");

// Controller to handle Internship application creation
const createApplication = async (req, res) => {
  try {
    const {
      surname,
      firstName,
      otherNames,
      email,
      phoneNumber,
      nationality,
      idPassportNumber,
      address,
      identificationDocument,
      institutionName,
      courseProgram,
      currentYear,
      yearOfGraduation,
      academicQualification,
      academicDocuments,
      insurancePolicyNumber,
      insuranceCompany,
      policyExpirationDate,
      emergencyContactPerson,
      emergencyContactPhone,
      emergencyContactEmail,
      insuranceDocument,
      internshipDepartment,
      internshipStartDate,
      internshipEndDate,
    } = req.body;

    // Get the current date and the date 2 months ago
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    // Check if the applicant has applied within the last 2 months using ID/Passport number
    const existingApplication = await InternshipApplications.findOne({
      where: {
        [Op.or]: [
          {
            idPassportNumber: idPassportNumber,
          },
          {
            email: email,
          },
        ],
        createdAt: {
          [Op.gte]: twoMonthsAgo, // Check if the application was created within the last 2 months
        },
      },
    });

    // If a recent application is found, return an error
    if (existingApplication) {
      return res.status(400).json({
        message: `You have an existing application made on ${existingApplication.createdAt.toDateString()}`,
      });
    }

    // If no recent application is found, create a new application
    const internshipApplications = await InternshipApplications.create({
      surname,
      firstName,
      otherNames,
      email,
      phoneNumber,
      nationality,
      idPassportNumber,
      address,
      identificationDocument,
      institutionName,
      courseProgram,
      currentYear,
      yearOfGraduation,
      academicQualification,
      academicDocuments,
      insurancePolicyNumber,
      insuranceCompany,
      policyExpirationDate,
      emergencyContactPerson,
      emergencyContactPhone,
      emergencyContactEmail,
      insuranceDocument,
      internshipDepartment,
      internshipStartDate,
      internshipEndDate,
    });

    return res.status(200).json({
      message: "Application successfully created!",
      internshipApplications,
    });
  } catch (error) {
    console.error("Error creating application:", error);
    return res.status(500).json({
      message:
        "An error occurred while creating the application. Please try again later",
    });
  }
};

// Fetch all applications
const getApplications = async (req, res) => {
  try {
    const applications = await InternshipApplications.findAll();
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching Internship applications" });
  }
};

// Fetch a specific application by ID
const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await InternshipApplications.findByPk(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching application" });
  }
};
// Update an existing application
const updateApplication = async (req, res) => {
  try {
    const { idPassportNumber } = req.params; // Extract idPassportNumber from the params
    const updatedData = req.body;

    // Find the application by idPassportNumber (not id)
    const application = await InternshipApplications.findOne({
      where: { idPassportNumber },
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Check if the application is older than 2 months
    const currentDate = new Date();
    if (
      new Date(application.createdAt) <
      currentDate.setMonth(currentDate.getMonth() - 2)
    ) {
      return res.status(400).json({
        message:
          "This application is already older than 2 months and has been moved to the archive. Remove from archive and try again",
      });
    }

    // Update the application
    await application.update(updatedData);

    res.status(200).json({
      message: "Application successfully updated",
      application,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating application, please try again" });
  }
};

// Delete an application
const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await InternshipApplications.findByPk(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    await application.destroy();

    res.status(200).json({ message: "Application successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting application" });
  }
};

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
