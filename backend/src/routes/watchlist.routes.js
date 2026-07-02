const express = require("express");

const {
  addTeam,
  getWatchlist,
  removeTeam,
} = require("../controllers/watchlist.controller");

// Initialize Router
const router = express.Router();

// POST /api/v1/watchlist
router.post("/", addTeam);

// GET /api/v1/watchlist/:deviceId
router.get("/:deviceId", getWatchlist);

// DELETE /api/v1/watchlist
router.delete("/", removeTeam);

module.exports = router;
