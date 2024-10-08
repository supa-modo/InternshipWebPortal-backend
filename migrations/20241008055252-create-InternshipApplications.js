"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("InternshipApplications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      surname: Sequelize.STRING,
      firstName: Sequelize.STRING,
      otherNames: Sequelize.STRING,
      email: Sequelize.STRING,
      phoneNumber: Sequelize.STRING,
      nationality: Sequelize.STRING,
      idPassportNumber: Sequelize.STRING,
      address: Sequelize.STRING,
      identificationDocument: Sequelize.STRING,
      institutionName: Sequelize.STRING,
      courseProgram: Sequelize.STRING,
      currentYear: Sequelize.STRING,
      yearOfGraduation: Sequelize.STRING,
      academicQualification: Sequelize.STRING,
      academicDocuments: Sequelize.STRING,
      insurancePolicyNumber: Sequelize.STRING,
      insuranceCompany: Sequelize.STRING,
      policyExpirationDate: Sequelize.DATE,
      emergencyContactPerson: Sequelize.STRING,
      emergencyContactPhone: Sequelize.STRING,
      emergencyContactEmail: Sequelize.STRING,
      insuranceDocument: Sequelize.STRING,
      internshipDepartment: Sequelize.STRING,
      internshipStartDate: Sequelize.DATE,
      internshipEndDate: Sequelize.DATE,
      applicationStatus: {
        type: Sequelize.STRING,
        defaultValue: "Pending",
      },
      internshipSupervisor: {
        type: Sequelize.STRING,
        defaultValue: "Not Assigned",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("InternshipApplications");
  },
};
