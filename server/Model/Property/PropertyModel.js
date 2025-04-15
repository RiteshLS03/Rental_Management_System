const mongoose = require("mongoose");

const PropertyModel = mongoose.Schema({
  address: String,
  landlord: { type: mongoose.Schema.Types.ObjectId, ref: "Landlords" },
  incharge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = mongoose.model("Properties", PropertyModel);
