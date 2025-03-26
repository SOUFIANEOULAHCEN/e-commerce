const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      console.log("Token error:", err.message);
      return res.status(403).json({ message: "Error Validating Token" });
    }
    req.user = decoded.userInfo;
    // const user =dhjs.find((user) => user.id === req.user.id);
    // if (user .role === 'admin') {
    //   return next();
    // }
    next();
  });
};

module.exports = { verifyToken };
