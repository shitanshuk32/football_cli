require("dotenv").config();

const app = require("./src/app");
const { PORT } = require("./src/config/env");

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
