const Router = require("express").Router();
const { addRoom } = require("../Controllers/RoomsController");

Router.post("/add-room", addRoom);

module.exports = Router;
