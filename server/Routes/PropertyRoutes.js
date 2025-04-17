const { addProperty } = require("../Controllers/PropertyController");

const Router = require("express").Router();

Router.post("/add-property", addProperty);

module.exports = Router;
