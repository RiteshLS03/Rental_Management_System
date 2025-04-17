const Router = require("express").Router();
const { addLandlord } = require("../Controllers/LandlordsController");
const { addProperty } = require("../Controllers/PropertyController");
const { addRoom } = require("../Controllers/RoomsController");
const { addUser } = require("../Controllers/UsersController");
const landlordProtected = require("../Middlewares/LandlordProtected");

Router.post("/add-landlord", addLandlord);
Router.post("/add-property", landlordProtected, addProperty);
Router.post("/add-room", landlordProtected, addRoom);
Router.post("/assign-user-to-room", landlordProtected, addUser);

module.exports = Router;
