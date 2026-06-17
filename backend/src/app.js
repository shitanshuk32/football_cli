const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/error.middleware"); // Error middleware
const matchRoutes = require("./routes/match.routes"); // Routes

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/v1/matches", matchRoutes);

// Routes
app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
  });
});

// Error middleware
app.use(errorHandler); // Should be placed after all routes as express executes top to bottom.

module.exports = app;
