const mongoose = require("mongoose");

// Connect to MongoDB
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected.....");
  } catch (error) {
    console.error("MongoDB Connection Failed.....", error.message);

    process.exit(1);
  }
};

// Export connectDb
module.exports = connectDb;
