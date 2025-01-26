const express = require("express");
const LoanCategory = require("../models/LoanCategory");
const router = express.Router();

// Fetch all loan categories
router.get("/", async (req, res) => {
  try {
    const categories = await LoanCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch loan categories" });
  }
});

// Add a new loan category
router.post("/", async (req, res) => {
  const { name, path, description } = req.body;

  if (!name || !path || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newCategory = new LoanCategory({ name, path, description });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to create loan category" });
  }
});

// Update a loan category
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, path, description } = req.body;

  try {
    const updatedCategory = await LoanCategory.findByIdAndUpdate(
      id,
      { name, path, description },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Loan category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to update loan category" });
  }
});

// Delete a loan category
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await LoanCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ error: "Loan category not found" });
    }

    res.status(200).json({ message: "Loan category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete loan category" });
  }
});

module.exports = router;
