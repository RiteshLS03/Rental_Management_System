const asyncHandler = require("express-async-handler");

exports.addUser = asyncHandler(async (req, res) => {
  const { id, password } = req.body;
});
