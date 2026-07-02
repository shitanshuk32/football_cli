const mongoose = require("mongoose");

// Watchlist Schema
const watchlistSchema = new mongoose.Schema(
  {
    // The deviceId is the id of the device that is adding the team to watchlist
    deviceId: {
      type: String,
      required: true,
    },
    // The team is the team that is being added to the watchlist
    team: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    // The teamCode is the code of the team that is being added to the watchlist
    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
  },
  {
    // This will add createdAt and updatedAt fields to the schema
    timestamps: true,
  },
);

// Index the schema
// This will ensure that the deviceId and code are unique together
watchlistSchema.index(
  {
    deviceId: 1,
    code: 1,
  },
  {
    unique: true,
  },
);

// Export the Watchlist Model
// This will create a model called Watchlist
module.exports = mongoose.model("Watchlist", watchlistSchema);
