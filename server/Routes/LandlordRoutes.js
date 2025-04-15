const router = require("express").Router();
const { addLandlord } = require("../Controllers/LandlordsController");

router.post("/add-landlord", addLandlord);

module.exports = router;
