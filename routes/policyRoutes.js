// routes/policyroutes.js
const express = require("express");
const router = express.Router();
const InternshipPolicies = require("../models/InternshipPolicies"); // Ensure the correct import

// Get all policies
router.get("/internship-policies", async (req, res) => {
  try {
    const policies = await InternshipPolicies.findAll();
    res.status(200).json(policies);
  } catch (error) {
    console.error("Error fetching policies:", error);
    res.status(500).json({ message: "Error fetching policies" });
  }
});

// Create a new policy
router.post("/internship-policies", async (req, res) => {
  const { section, paragraph } = req.body;
  try {
    const newPolicy = await InternshipPolicies.create({ section, paragraph });
    res.status(201).json(newPolicy);
  } catch (error) {
    console.error("Error creating policy:", error);
    res.status(500).json({ message: "Error creating policy" });
  }
});

// Update a policy
router.put("/internship-policies/:id", async (req, res) => {
  const { id } = req.params;
  const { section, paragraph } = req.body;
  try {
    const policy = await InternshipPolicies.findByPk(id);
    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }
    policy.section = section;
    policy.paragraph = paragraph;
    await policy.save();
    res.status(200).json(policy);
  } catch (error) {
    console.error("Error updating policy:", error);
    res.status(500).json({ message: "Error updating policy" });
  }
});

// Delete a policy
router.delete("/internship-policies/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPolicy = await InternshipPolicies.destroy({ where: { id } });
    if (deletedPolicy) {
      return res.status(204).send();
    }
    return res.status(404).json({ message: "Policy not found" });
  } catch (error) {
    console.error("Error deleting policy:", error);
    res.status(500).json({ message: "Error deleting policy" });
  }
});

module.exports = router;
