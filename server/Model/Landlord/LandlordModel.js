const mongoose = require("mongoose");

const LandlordModel = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    String,
  },
  properties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
  role: {
    type: String,
    default: "landlord",
  },
});

module.exports = mongoose.model("Landlords", LandlordModel);
