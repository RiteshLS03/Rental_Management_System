const mongoose = require("mongoose");

const UsersModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  mobile: {
    type: String,
    unique: true,
    required: true,
  },
  idProof: {
    type: String,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  assignedRoom: { type: mongoose.Schema.ObjectId, ref: "Room" },
  role: {
    type: String,
    enum: ["user", "incharge"],
    default: "user",
  },
});

module.exports = mongoose.model("Users", UsersModel);
