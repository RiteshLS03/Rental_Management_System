const Router = require("express").Router();
const { landlordLogin, adminLogin } = require("../Controllers/AuthController");

Router.post("/landlord/login", landlordLogin);
Router.post("/admin/login", adminLogin);
Router.post("/user/login", adminLogin);

module.exports = Router;
