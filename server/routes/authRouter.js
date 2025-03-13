const express = require("express");
const {
  register,
  login,
  getAllusers,
} = require("../controller/authController");
const { verifyToken } = require("../middleware/isAuth.js");
const router = express.Router();
/* -------------------------------------------------------------------------- */
router.post("/register", register);

router.post("/login", login);
router.get("/allusers", verifyToken, getAllusers);
/* -------------------------------------------------------------------------- */
module.exports = router;
