const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class InternshipApplications extends Model {
  // Static method to associate this model with others if needed
  static associate(models) {
    // Define associations here if needed
  }
}

InternshipApplications.init(
  {
    surname: DataTypes.STRING,
    firstName: DataTypes.STRING,
    otherNames: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    nationality: DataTypes.STRING,
    idPassportNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    identificationDocument: DataTypes.STRING,
    institutionName: DataTypes.STRING,
    courseProgram: DataTypes.STRING,
    currentYear: DataTypes.STRING,
    yearOfGraduation: DataTypes.STRING,
    academicQualification: DataTypes.STRING,
    academicDocuments: DataTypes.STRING,
    insurancePolicyNumber: DataTypes.STRING,
    insuranceCompany: DataTypes.STRING,
    policyExpirationDate: DataTypes.DATE,
    emergencyContactPerson: DataTypes.STRING,
    emergencyContactPhone: DataTypes.STRING,
    emergencyContactEmail: DataTypes.STRING,
    insuranceDocument: DataTypes.STRING,
    internshipDepartment: DataTypes.STRING,
    internshipStartDate: DataTypes.DATE,
    internshipEndDate: DataTypes.DATE,
    applicationStatus: {
      type: DataTypes.STRING,
      defaultValue: "Pending",
    },
    internshipSupervisor: {
      // New field added here
      type: DataTypes.STRING,
      defaultValue: "Not Assigned",
    },
  },
  {
    sequelize,
    modelName: "InternshipApplications",
    tableName: "InternshipApplications",
    timestamps: true,
  }
);

module.exports = InternshipApplications;
