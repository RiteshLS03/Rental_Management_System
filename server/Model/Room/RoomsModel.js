const mongoose = require("mongoose");

const RoomsModel = mongoose.Schema({
  roomNumber: String,
  rentAmount: Number,
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Properties" },
  tenacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
});

module.exports = mongoose.model("Rooms", RoomsModel);
