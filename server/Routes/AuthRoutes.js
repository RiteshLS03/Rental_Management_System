const Router = require("express").Router();
const { landlordLogin } = require("../Controllers/AuthController");

Router.post("/landlord/login", landlordLogin);

module.exports = Router;
