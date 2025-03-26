// const express = require("express");
// const {
//   register,
//   login,
//   getAllusers,
// } = require("../controller/authController");
// const { verifyToken } = require("../middleware/isAuth.js");
// const router = express.Router();
// /* -------------------------------------------------------------------------- */
// router.post("/register" ,register);

// router.post("/login", login);
// // router.get("/allusers", verifyToken, getAllusers);
// router.get("/allusers", getAllusers);
// /* -------------------------------------------------------------------------- */
// module.exports = router;



const express = require("express");
const { register, login, getAllUsers, refreshToken } = require("../controller/authController");
const { verifyToken } = require("../middleware/isAuth.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/allusers", verifyToken, getAllUsers);
router.get("/refresh", refreshToken);

module.exports = router;
