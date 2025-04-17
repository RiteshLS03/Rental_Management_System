const Router = require("express").Router();
const { addUser } = require("../Controllers/UsersController");

Router.post("/add-user", addUser);

module.exports = Router;
