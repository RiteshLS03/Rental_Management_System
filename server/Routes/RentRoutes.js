const Router = require("express").Router();
const { getRentStatusForLandlord } = require("../Controllers/RentsController");

Router.get("/get-rents-status/:landlordId", getRentStatusForLandlord);

module.exports = Router;
