const asyncHandler = require("express-async-handler");
const Rooms = require("../Model/Room/RoomsModel"); // Adjust path as needed
// const = require("")
const Properties = require("../Model/Property/PropertyModel"); // Adjust path as needed
const RoomsModel = require("../Model/Room/RoomsModel");

exports.addRoom = asyncHandler(async (req, res) => {
  const { roomNumber, rentAmount, property } = req.body;

  // Validate required fields
  if (!roomNumber || !rentAmount || !property) {
    return res.status(400).json({
      message: "Please provide roomNumber, rentAmount, and property ID",
    });
  }

  try {
    // Check if property exists
    const propertyExists = await Properties.findById(property);
    if (!propertyExists) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Check if room number already exists in this property
    const existingRoom = await Rooms.findOne({ roomNumber, property });
    if (existingRoom) {
      return res.status(400).json({
        message: "Room with this number already exists in this property",
      });
    }

    // Create new room
    const newRoom = new Rooms({
      roomNumber,
      rentAmount,
      property,
      tenacts: [], // Initialize with empty tenants array
    });

    // Save room to database
    const savedRoom = await newRoom.save();

    // Return successful response
    res.status(201).json({
      message: "Room added successfully",
      room: savedRoom,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding room",
      error: error.message,
    });
  }
});

exports.removeRooms = asyncHandler(async (req, res) => {
  const { roomNumber } = req.body;

  if (!roomNumber) {
    return res.status(400).json({ message: "Room number is required." });
  }

  const removedRoom = await Rooms.findOneAndDelete({ roomNumber });
  // const removedRoom = await RoomsModel
  if (!removedRoom) {
    return res.status(404).json({ message: "Room not found." });
  }

  res.status(200).json({
    message: `Room ${roomNumber} has been successfully removed.`,
    room: removedRoom,
  });
});

// Get all rooms
exports.getAllRooms = asyncHandler(async (req, res) => {
  try {
    const rooms = await Rooms.find()
      .populate("property", "name address")
      .populate("tenacts", "name mobile email");

    res.status(200).json({
      count: rooms.length,
      rooms: rooms,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching rooms",
      error: error.message,
    });
  }
});

// Get room by ID
exports.getRoomById = asyncHandler(async (req, res) => {
  try {
    const room = await Rooms.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json(room);
  } catch (err) {
    console.error("Error fetching room by ID:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
