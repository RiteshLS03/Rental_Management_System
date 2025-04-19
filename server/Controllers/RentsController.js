const asyncHandler = require("express-async-handler");
const Rooms = require("../Model/Room/RoomsModel");
const Rents = require("../Model/Rent/RentModel");

exports.getRentStatusForLandlord = asyncHandler(async (req, res) => {
  const landlordId = req.params.landlordId; // assuming user is authenticated

  // Step 1: Get all rooms that belong to properties owned by this landlord
  const rooms = await Rooms.find().populate({
    path: "property",
    match: { owner: landlordId },
    select: "_id owner",
  });

  const roomIds = rooms
    .filter((room) => room.property) // remove rooms not matching the landlord
    .map((room) => room._id);

  if (roomIds.length === 0) {
    return res.status(200).json({ paid: [], unpaid: [] });
  }

  // Step 2: Find rent records for those rooms
  const rents = await Rents.find({ room: { $in: roomIds } })
    .populate("tenant", "name email mobile")
    .populate("room", "roomNumber");

  const paid = rents.filter((r) => r.status === "Paid");
  const unpaid = rents.filter((r) => r.status === "Unpaid");

  res.status(200).json({ paid, unpaid });
});

exports.createRentReceipt = asyncHandler(async (req, res) => {
  const { tenact, roomId, amountPaid, dueDate, paidDate } = req.body;

  // Step 1: Find room
  const room = await Rooms.findById(roomId);
  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }

  // Step 2: Create rent receipt using room's details
  const rent = await Rents.create({
    tenact,
    roomNumber: room.roomNumber,
    rentAmount: room.rentAmount,
    amountPaid,
    dueDate,
    paidDate,
    status: amountPaid >= room.rentAmount ? "Paid" : "Unpaid",
  });

  res.status(201).json({ message: "Rent receipt created successfully", rent });
});
