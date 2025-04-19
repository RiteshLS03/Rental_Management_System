const Router = require("express").Router();
const { addLandlord } = require("../Controllers/LandlordsController");
const { addProperty } = require("../Controllers/PropertyController");
const {
  addRoom,
  removeRooms,
  getAllRooms,
  getRoomById,
} = require("../Controllers/RoomsController");
const { assignUserToRoom } = require("../Controllers/LandlordsController");
const landlordProtected = require("../Middlewares/LandlordProtected");

Router.post("/add-landlord", addLandlord);
Router.post("/add-property", landlordProtected, addProperty);
Router.post("/add-room", landlordProtected, addRoom);
Router.post("/assign-user-to-room", landlordProtected, assignUserToRoom);
Router.post("/remove-room", landlordProtected, removeRooms);
Router.get("/get-all-rooms", getAllRooms);
Router.get("/get-room/:id", getRoomById);

module.exports = Router;
