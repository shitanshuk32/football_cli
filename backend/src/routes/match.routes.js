const express = require("express");

const {
  getLiveMatches,
  getMatches,
  getUpcomingMatches,
  getTodayMatches,
} = require("../controllers/match.controller");

// Initialize Router
const router = express.Router();

// Routes
router.get("/live", getLiveMatches);
router.get("/today", getTodayMatches);
router.get("/upcoming", getUpcomingMatches);
router.get("/", getMatches);

// Export router
module.exports = router;
