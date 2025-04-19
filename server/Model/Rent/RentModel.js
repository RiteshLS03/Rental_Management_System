const mongoose = require("mongoose");

const RentModel = mongoose.Schema(
  {
    tenact: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    roomNumber: { type: mongoose.Schema.Types.ObjectId, ref: "Rooms" },
    rentAmount: { type: mongoose.Schema.Types.ObjectId, ref: "Rooms" },
    amountPaid: Number,
    dueDate: Date,
    paidDate: Date,
    status: { type: String, enum: ["Paid", "Unpaid"], default: "Unpaid" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rents", RentModel);

{
  /**
  
  {
  "tenact": "68036b47b1fff06216784f7d",
  "roomNumber": "6803677eab3bf4ab94786d95",
  "rentAmount": 1200,
  "amountPaid": 1200,
  "dueDate": "2025-05-01T00:00:00.000Z",
  "paidDate": "2025-04-31T00:00:00.000Z",
  "status": "Paid"
}

  
  */
}
