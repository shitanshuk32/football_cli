require("dotenv").config();

const app = require("./src/app");
const { PORT } = require("./src/config/env");
const connectDb = require("./src/db/connectDb");

const startServer = async () => {
  try {
    await connectDb();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server Error.....", error.message);
  }
};

startServer();
