const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

class Application extends Model {}

Application.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otherNames: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idPassportNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    identificationDocument: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    institutionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseProgram: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currentYear: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    yearOfGraduation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    academicQualification: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    academicDocuments: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    insurancePolicyNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    insuranceCompany: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    policyExpirationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    emergencyContactPerson: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emergencyContactPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emergencyContactEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    insuranceDocument: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    internshipDepartment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    internshipStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    internshipEndDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Application',
    tableName: 'Applications',
    timestamps: true, 
  }
);

module.exports = Application;
