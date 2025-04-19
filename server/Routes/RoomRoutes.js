const Router = require("express").Router();
const {
  addRoom,
  removeRoom,
  getAllRooms,
} = require("../Controllers/RoomsController");

Router.post("/add-room", addRoom);
Router.post("/remove-room", removeRoom);
Router.post("/get-all-rooms", getAllRooms);

module.exports = Router;
