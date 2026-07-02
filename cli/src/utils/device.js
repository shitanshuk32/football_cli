const os = require("os");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

// ~/.footy
const footyDir = path.join(os.homedir(), ".footy");

// ~/.footy/config.json
const deviceFilePath = path.join(footyDir, "config.json");

// Creates the config file if it doesn't exist,
// otherwise returns the existing one.
const getOrCreateDeviceFile = () => {
  // Create ~/.footy if needed
  if (!fs.existsSync(footyDir)) {
    // Create the directory recursively
    // This is to handle the case where the directory does not exist
    fs.mkdirSync(footyDir, { recursive: true });
  }

  // If config already exists, read and return it
  if (fs.existsSync(deviceFilePath)) {
    try {
      return JSON.parse(fs.readFileSync(deviceFilePath, "utf8"));
    } catch (error) {
      console.error("Error parsing device file:", error);
      return null;
    }
  }

  // Create new config
  const deviceData = {
    deviceId: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  fs.writeFileSync(deviceFilePath, JSON.stringify(deviceData, null, 2));

  return deviceData;
};

// Helper for getting only the deviceId
const getDeviceId = () => {
  const device = getOrCreateDeviceFile();

  if (!device) {
    throw new Error("Unable to get device information.");
  }

  return device.deviceId;
};

module.exports = {
  getOrCreateDeviceFile,
  getDeviceId,
};
