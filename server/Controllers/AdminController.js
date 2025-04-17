const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Admin = require("../Model/Admin/AdminsModel");

exports.addAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide name, email, and password" });
  }

  // Check if admin already exists
  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    return res
      .status(400)
      .json({ message: "Admin with this email already exists" });
  }

  // Hash the password
  // const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new admin
  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
  });

  if (admin) {
    res.status(200).json({
      message: "Admin added successfully!",
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } else {
    res.status(500).json({ message: "Failed to create admin" });
  }
});
