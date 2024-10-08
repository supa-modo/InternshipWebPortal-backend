// In models/InternshipPolicies.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const InternshipPolicies = sequelize.define("InternshipPolicies", {
  section: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paragraph: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = InternshipPolicies;
