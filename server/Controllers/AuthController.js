// const asyncHandler = require("express-async-handler");
// const Landlord = require("../Model/Landlord/LandlordModel"); // adjust the path as needed
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// exports.landlordLogin = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   // Check if email and password are provided
//   if (!email || !password) {
//     res.status(400).json({ message: "Please provide both email and password" });
//   }

//   // Check if landlord exists
//   const landlord = await Landlord.findOne({ email });

//   if (!landlord) {
//     res.status(401).json({ message: "Invalid email or password" });
//   }

//   // Compare password
//   const isMatch = await bcrypt.compare(password, landlord.password);
//   console.log(isMatch);

//   if (!isMatch) {
//     res.status(401).json({ message: "Invalid email or password" });
//   }

//   // Generate token (adjust secret and expiration as needed)
//   const token = jwt.sign({ id: landlord._id }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });

//   // Set token as a cookie
//   res.cookie("token", token, {
//     httpOnly: true,
//     // secure: process.env.NODE_ENV === "production", // send over HTTPS only in production
//     sameSite: "none", // protects against CSRF
//     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
//   });

//   // Send response JSON
//   res.status(200).json({
//     message: "Login successful",
//     landlord: {
//       id: landlord._id,
//       name: landlord.name,
//       email: landlord.email,
//     },
//     token, // optional: remove this if you want token only in cookie
//   });
// });

const asyncHandler = require("express-async-handler");
const Landlord = require("../Model/Landlord/LandlordModel"); // adjust the path as needed
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.landlordLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both email and password" });
  }

  // Check if landlord exists
  const landlord = await Landlord.findOne({ email });

  if (!landlord) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Add these debug logs
  console.log("Password type:", typeof password);
  console.log("Landlord password type:", typeof landlord.password);

  // Ensure both values are strings
  if (typeof password !== "string" || typeof landlord.password !== "string") {
    return res.status(500).json({
      message: "Authentication error",
      details: "Password validation failed due to invalid data types",
    });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, landlord.password);
  console.log(isMatch);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Generate token (adjust secret and expiration as needed)
  const token = jwt.sign({ id: landlord._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Set token as a cookie
  res.cookie("token", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production", // send over HTTPS only in production
    sameSite: "none", // protects against CSRF
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });

  // Send response JSON
  res.status(200).json({
    message: "Login successful",
    landlord: {
      id: landlord._id,
      name: landlord.name,
      email: landlord.email,
    },
  });
});
