const mongoose = require("mongoose");

const RentModel = mongoose.Schema({
  tenact: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  roomNumber: { type: mongoose.Schema.Types.ObjectId, ref: "Rooms" },
  rentAmount: { type: mongoose.Schema.Types.ObjectId, ref: "Rooms" },
  amountPaid: Number,
  dueDate: Date,
  paidDate: Date,
  status: { type: String, enum: ["Paid", "Unpaid"], default: "Unpaid" },
});

module.exports = mongoose.model("Rents", RentModel);
