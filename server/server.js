const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Config/database");
const cookieParser = require("cookie-parser");

// Middlewares
const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

// PORT Defining
const port = process.env.PORT || 5000;

// Routes
app.use("/auth", require("./Routes/AuthRoutes"));
app.use("/admin", require("./Routes/AdminRoutes"));
app.use("/landlord", require("./Routes/LandlordRoutes"));
app.use("/user", require("./Routes/UsersRoutes"));
// app.use("/*", (req, res) => {
//   res.status(404).json({ message: "No resource found" });
// }); IDK why but it's causing error

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
