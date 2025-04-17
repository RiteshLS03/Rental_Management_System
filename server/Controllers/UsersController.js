const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Users = require("../Model/Users/UsersModel"); // Adjust path as needed

exports.addUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    mobile,
    aadharCardNo,
    permanentAddress,
    password,
    role,
  } = req.body;

  // Validate required fields
  if (!name || !mobile || !permanentAddress || !password) {
    return res.status(400).json({
      message:
        "Please provide all required fields: name, mobile, permanentAddress, and password",
    });
  }

  try {
    // Check if user already exists with the same mobile or email
    const existingUserByMobile = await Users.findOne({ mobile });
    if (existingUserByMobile) {
      return res
        .status(400)
        .json({ message: "User with this mobile number already exists" });
    }

    if (email) {
      const existingUserByEmail = await Users.findOne({ email });
      if (existingUserByEmail) {
        return res
          .status(400)
          .json({ message: "User with this email already exists" });
      }
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new Users({
      name,
      email,
      mobile,
      aadharCardNo,
      permanentAddress,
      password: hashedPassword,
      role: role || "user", // Default to "user" if not specified
    });

    // Save user to database
    const savedUser = await newUser.save();

    // Return successful response without password
    res.status(201).json({
      message: "User added successfully",
      data: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        mobile: savedUser.mobile,
        permanentAddress: savedUser.permanentAddress,
        role: savedUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding user",
      error: error.message,
    });
  }
});
