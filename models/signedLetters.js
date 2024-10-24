// models/SignedLetter.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SignedLetter = sequelize.define("SignedLetter", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  applicantName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  letterType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateUploaded: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Sync the model with the database
SignedLetter.sync();

module.exports = SignedLetter;
