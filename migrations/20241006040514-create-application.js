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
      surname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      otherNames: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nationality: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idPassportNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      identificationDocument: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      institutionName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      courseProgram: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      currentYear: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      yearOfGraduation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      academicQualification: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      academicDocuments: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      insurancePolicyNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      insuranceCompany: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      policyExpirationDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      emergencyContactPerson: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      emergencyContactPhone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      emergencyContactEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      insuranceDocument: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      applicationStatus: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Pending",
      },
      internshipDepartment: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      internshipStartDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      internshipEndDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      internshipSupervisor: {
        type: Sequelize.STRING,
        allowNull: false,
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
