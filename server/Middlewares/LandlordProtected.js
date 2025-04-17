const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const landlordProtected = asyncHandler(async (req, res, next) => {
  let token;
  if (req.cookies.landlord_token) {
    token = req.cookies.landlord_token;
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ message: "Unauthorized, token expired" });
    }

    req.landlord = decoded;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized, invalid token" });
    }

    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = landlordProtected;
