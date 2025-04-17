const asyncHandler = require("express-async-handler");
const Landlord = require("../Model/Landlord/LandlordModel"); // adjust the path as needed
const Admin = require("../Model/Admin/AdminsModel"); // adjust the path as needed
const User = require("../Model/Users/UsersModel");
const bcrypt = require("bcryptjs");
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
  console.log(password, landlord.password);
  if (!landlord) {
    return res.status(401).json({ message: "Invalid email or password" });
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
  res.cookie("landlord_token", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production", // send over HTTPS only in production
    sameSite: "none", // protects against CSRF
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });

  // Send response JSON
  res.status(200).json({
    message: "Login successful",
    data: {
      id: landlord._id,
      name: landlord.name,
      email: landlord.email,
      role: "landlord",
    },
  });
});

exports.adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both email and password" });
  }

  // Check if admin exists
  const admin = await Admin.findOne({ email });

  if (!admin) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Generate token
  const token = jwt.sign(
    { id: admin._id, role: "admin" },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  // Set token as a cookie
  res.cookie("admin_token", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production", // send over HTTPS only in production
    sameSite: "none", // protects against CSRF
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });

  // Send response JSON
  res.status(200).json({
    message: "Admin login successful",
    data: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: "admin",
    },
  });
});

exports.userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both email and password" });
  }

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Generate token
  const token = jwt.sign(
    { id: user._id, role: "user" },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  // Set token as a cookie
  res.cookie("user_token", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production", // send over HTTPS only in production
    sameSite: "none", // protects against CSRF
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });

  // Send response JSON
  res.status(200).json({
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: "user",
    },
  });
});
