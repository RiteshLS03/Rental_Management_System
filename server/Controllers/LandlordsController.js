const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Landlord = require("../Model/Landlord/LandlordModel"); // Adjust path if needed
const mongoose = require("mongoose");
const Rooms = require("../Model/Room/RoomsModel");

exports.addLandlord = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Validate input
  if (!name || !email || !password) {
    res
      .status(400)
      .json({ message: "Please provide name, email, and password" });
  }

  // 2. Check for existing landlord
  const landlordExists = await Landlord.findOne({ email });
  if (landlordExists) {
    res
      .status(400)
      .json({ message: "Landlord with this email already exists" });
  }

  // 3. Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  // 4. Create landlord
  const newLandlord = await Landlord.create({
    name,
    email,
    password: hashedPassword,
  });

  // 5. Respond
  if (newLandlord) {
    res.status(201).json({
      message: "Landlord created successfully!",
      user: {
        _id: newLandlord._id,
        name: newLandlord.name,
        email: newLandlord.email,
      },
    });
  } else {
    res.status(400).json({ message: "Invalid landlord data" });
  }
});
exports.assignUserToRoom = asyncHandler(async (req, res) => {
  const { userId, roomId } = req.body;
  // const  = req.params.id;

  if (
    !mongoose.Types.ObjectId.isValid(roomId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    return res.status(400).json({ message: "Invalid Room ID or User ID" });
  }

  const room = await Rooms.findById(roomId);
  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }

  // Check if user is already assigned
  if (room.tenacts.includes(userId)) {
    return res
      .status(400)
      .json({ message: "User already assigned to this room" });
  }

  room.tenacts.push(userId);
  await room.save();

  res.status(200).json({ message: "User assigned to room successfully", room });
});
