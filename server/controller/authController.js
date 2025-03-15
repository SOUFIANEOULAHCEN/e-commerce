const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const cookie = require("cookie-parser");
require("dotenv").config();

/* -------------------------------------------------------------------------- */
/*                             register middleware                            */
/* -------------------------------------------------------------------------- */
const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "all filed are required" });
    }
    const userExisting = await User.findOne({ email }).exec();
    if (userExisting) {
      return res.status(401).json({ message: "user alreday exist " });
    }
    const HashedPAssword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: HashedPAssword,
    });

    const accessTocken = jwt.sign(
      { userInfo: { id: newUser._id } },
      process.env.ACCESS_TOKEN,
      { expiresIn: "10m" }
    );

    const refreshTocken = jwt.sign(
      { userInfo: { id: newUser._id } },
      process.env.REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", refreshTocken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      accessTocken,
      email: newUser.email,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      password: newUser.password,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};


/* -------------------------------------------------------------------------- */
/*                              login middleware                              */
/* -------------------------------------------------------------------------- */


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "all filed are required" });
    }
    const userExisting = await User.findOne({ email }).exec();
    if (!userExisting) {
      return res.status(401).json({ message: "user doesn't exist " });
    }
    const HashedPAssword = await bcrypt.compare(
      password,
      userExisting.password
    );

    if (!HashedPAssword) {
      return res.status(402).json({ message: "wrong password" });
    }

    const accessTocken = jwt.sign(
      { userInfo: { id: userExisting._id } },
      process.env.ACCESS_TOKEN,
      { expiresIn: "10m" }
    );

    const refreshTocken = jwt.sign(
      { userInfo: { id: userExisting._id } },
      process.env.REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", refreshTocken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      accessTocken,
      email: userExisting.email,
      first_name: userExisting.first_name,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
/* -------------------------------------------------------------------------- */
/*                                 getAllusers middleware                              */
/* -------------------------------------------------------------------------- */

const getAllusers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error fetching users" });
  }
};

/* -------------------------------------------------------------------------- */
/*                                   exports                                  */
/* -------------------------------------------------------------------------- */
module.exports = { register, login, getAllusers };
