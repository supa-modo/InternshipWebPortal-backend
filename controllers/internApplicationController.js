const { Op } = require("sequelize"); // Import Sequelize operators
const InternshipApplications = require("../models/internshipApplications");
const path = require("path");

const upload = require("../config/uploadsConfig");

//Controller for creating a new internship application with file uploads
const createApplication = async (req, res) => {
  try {
    // Files handled by multer
    const { files } = req;
    const {
      surname,
      firstName,
      otherNames,
      email,
      phoneNumber,
      nationality,
      idPassportNumber,
      address,
      institutionName,
      courseProgram,
      currentYear,
      yearOfGraduation,
      academicQualification,
      insurancePolicyNumber,
      insuranceCompany,
      policyExpirationDate,
      emergencyContactPerson,
      emergencyContactPhone,
      emergencyContactEmail,
      internshipDepartment,
      internshipStartDate,
      internshipEndDate,
    } = req.body;

    // Get relative paths from the uploaded files
    const academicDocumentsFileName = req.files.academicDocuments
      ? `uploads/${path.basename(req.files.academicDocuments[0].path)}`
      : null;

    const identificationDocumentFileName = req.files.identificationDocument
      ? `uploads/${path.basename(req.files.identificationDocument[0].path)}`
      : null;

    const insuranceDocumentFileName = req.files.insuranceDocument
      ? `uploads/${path.basename(req.files.insuranceDocument[0].path)}`
      : null;


    // Validate incoming data
    if (!email && !idPassportNumber) {
      return res.status(400).json({
        message: "Email and ID/Passport number are required.",
      });
    }

    // Get current date and the date 2 months ago
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    // Build query for checking existing applications
    const whereClause = {
      createdAt: {
        [Op.gte]: twoMonthsAgo, // Check if the application was created within the last 2 months
      },
    };

    if (idPassportNumber) whereClause.idPassportNumber = idPassportNumber;
    if (email) whereClause.email = email;

    const existingApplication = await InternshipApplications.findOne({
      where: whereClause,
    });

    if (existingApplication) {
      return res.status(409).json({
        message: `You have an existing application made on ${existingApplication.createdAt.toDateString()}`,
      });
    }


    // Create the application
    const internshipApplications = await InternshipApplications.create({
      surname,
      firstName,
      otherNames,
      email,
      phoneNumber,
      nationality,
      idPassportNumber,
      address,
      institutionName,
      courseProgram,
      currentYear,
      yearOfGraduation,
      academicQualification,
      insurancePolicyNumber,
      insuranceCompany,
      policyExpirationDate,
      emergencyContactPerson,
      emergencyContactPhone,
      emergencyContactEmail,
      internshipDepartment,
      internshipStartDate,
      internshipEndDate,
      academicDocuments: academicDocumentsFileName,
      identificationDocument: identificationDocumentFileName,
      insuranceDocument: insuranceDocumentFileName,
    });

    return res.status(201).json({
      message: "Application successfully created!",
      internshipApplications,
    });
  } catch (error) {
    console.error("Error creating application:", error);
    return res.status(500).json({
      message:
        "An error occurred while creating the application. Please try again later.",
    });
  }
};

// Fetching all applications
const getApplications = async (req, res) => {
  try {
    const applications = await InternshipApplications.findAll();
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching Internship applications" });
  }
};

//Fetching application stats
const getApplicationsStats = async (req, res) => {
  try {
    const totalApplications = await InternshipApplications.count();
    const approvedApplications = await InternshipApplications.count({
      where: { applicationStatus: "approved" },
    });
    const underReviewApplications = await InternshipApplications.count({
      where: { applicationStatus: "under review" },
    });
    const pendingApplications = await InternshipApplications.count({
      where: { applicationStatus: "pending" },
    });

    res.json({
      totalApplications,
      approvedApplications,
      underReviewApplications,
      pendingApplications,
    });
  } catch (error) {
    console.error("Error fetching internship stats:", error);
    res.status(500).send("Server Error");
  }
};

//Fetch applications by filter
const getFilteredApplications = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      status,
      department,
      supervisor,
      institution,
      nationality,
      duration,
    } = req.query;

    const whereClause = {};

    if (startDate) {
      whereClause.internshipStartDate = { [Op.gte]: new Date(startDate) };
    }

    if (endDate) {
      whereClause.internshipEndDate = { [Op.lte]: new Date(endDate) };
    }

    if (status) {
      whereClause.applicationStatus = status;
    }

    if (department) {
      whereClause.internshipDepartment = department;
    }

    if (supervisor) {
      whereClause.internshipSupervisor = supervisor;
    }

    if (institution) {
      whereClause.institutionName = institution;
    }

    if (nationality) {
      whereClause.nationality = nationality;
    }

    if (duration) {
      let durationCondition;

      switch (duration) {
        case "1": // 1 month
          durationCondition = literal(
            `DATEDIFF(MONTH, internshipStartDate, internshipEndDate) = 1`
          );
          break;
        case "3": // 3 months
          durationCondition = literal(
            `DATEDIFF(MONTH, internshipStartDate, internshipEndDate) = 3`
          );
          break;
        case "6": // 6 months
          durationCondition = literal(
            `DATEDIFF(MONTH, internshipStartDate, internshipEndDate) = 6`
          );
          break;
        default:
          durationCondition = null;
          break;
      }

      if (durationCondition) {
        whereClause[Op.and] = durationCondition;
      }
    }

    const filteredApplications = await InternshipApplications.findAll({
      where: whereClause,
    });

    res.json(filteredApplications);
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
    const { idPassportNumber } = req.params;
    const updatedData = req.body;

    // Find the application by idPassportNumber
    const application = await InternshipApplications.findOne({
      where: { idPassportNumber },
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // // Check if the application is older than 2 months
    // const currentDate = new Date();
    // if (
    //   new Date(application.createdAt) <
    //   currentDate.setMonth(currentDate.getMonth() - 2)
    // ) {
    //   return res.status(400).json({
    //     message:
    //       "This application is already older than 2 months and has been moved to the archive. Remove from archive and try again",
    //   });
    // }

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
    const { idPassportNumber } = req.params;

    const application = await InternshipApplications.findOne({
      where: { idPassportNumber },
    });

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
  getFilteredApplications,
  getApplicationsStats,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
