const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Config/database");

// Middlewares
const app = express();
dotenv.config();
app.use(express.json());
// PORT Defining
const port = process.env.PORT || 5000;
// Routes
app.use("/admin", require("./Routes/AdminRoutes"));
app.use("/landlord", require("./Routes/LandlordRoutes"));
// Connect to DB and then start server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err.message);
    process.exit(1); // Exit process with failure
  });
