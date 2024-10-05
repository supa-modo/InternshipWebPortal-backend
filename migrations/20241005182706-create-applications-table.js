'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('applications', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('applications');
  }
};
