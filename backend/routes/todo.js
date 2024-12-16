const express = require("express");
const Todo = require("../models/Todo");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to authenticate token
const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Add a Todo
router.post("/", authenticate, async (req, res) => {
  const { text } = req.body;

  try {
    const todo = await Todo.create({ userId: req.user.id, text });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
