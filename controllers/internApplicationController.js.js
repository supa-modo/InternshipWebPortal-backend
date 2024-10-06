const { Op } = require("sequelize"); // Import Sequelize operators
const InternApplication = require("../models/internApplication");

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
    const existingApplication = await InternApplication.findOne({
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
          // Check if the application was created within the last 2 months
          [Op.gte]: twoMonthsAgo,
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
    const internApplication = await InternApplication.create({
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
      internApplication,
    });
  } catch (error) {
    console.error("Error creating application:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while creating the application. Please try again later" });
  }
};

// Fetch all or filtered applications
const getApplications = async (req, res) => {
  try {
    const { status, startDate, endDate, institution } = req.query;

    // Build query conditions dynamically based on filters
    let conditions = {};

    if (status) {
      conditions.applicationStatus = status;
    }

    if (startDate && endDate) {
      conditions.applicationDate = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }

    if (institution) {
      conditions.institution = institution;
    }

    const applications = await InternApplication.findAll({ where: conditions });

    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching applications' });
  }
};



module.exports = { createApplication, getApplications };



