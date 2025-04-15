const router = require("express").Router();
const { addAdmin } = require("../Controllers/AdminController");

router.post("/add-admin", addAdmin);

module.exports = router;
