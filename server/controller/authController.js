// /* -------------------------------------------------------------------------- */
// /*                                   exports                                  */
// /* -------------------------------------------------------------------------- */
// module.exports = { register, login, getAllusers };

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* -------------------------------------------------------------------------- */
/*                             Register Middleware                            */
/* -------------------------------------------------------------------------- */
const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExisting = await User.findOne({ email }).exec();
    if (userExisting) {
      return res.status(401).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    const accessToken = jwt.sign(
      { userInfo: { id: newUser._id } },
      process.env.ACCESS_TOKEN,
      { expiresIn: "10m" }
    );

    const refreshToken = jwt.sign(
      { userInfo: { id: newUser._id } },
      process.env.REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      accessToken,
      email: newUser.email,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
    });
    // res.status(201).send("User created successfully");
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

/* -------------------------------------------------------------------------- */
/*                              Login Middleware                              */
/* -------------------------------------------------------------------------- */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExisting = await User.findOne({ email }).exec();
    if (!userExisting) {
      return res.status(401).json({ message: "User doesn't exist" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      userExisting.password
    );
    if (!isPasswordValid) {
      return res.status(402).json({ message: "Wrong password" });
    }

    const accessToken = jwt.sign(
      { userInfo: { id: userExisting._id } },
      process.env.ACCESS_TOKEN,
      { expiresIn: "10m" }
    );

    const refreshToken = jwt.sign(
      { userInfo: { id: userExisting._id } },
      process.env.REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      accessToken,
      email: userExisting.email,
      first_name: userExisting.first_name,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

/* -------------------------------------------------------------------------- */
/*                         Get All Users Middleware                           */
/* -------------------------------------------------------------------------- */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").exec();
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Error fetching users" });
  }
};

/* -------------------------------------------------------------------------- */
/*                         Refresh Token Middleware                           */
/* -------------------------------------------------------------------------- */
const refreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(401).json({ message: "No refresh token provided" });

  const token = cookies.jwt;
  jwt.verify(token, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const accessToken = jwt.sign(
      { userInfo: { id: decoded.userInfo.id } },
      process.env.ACCESS_TOKEN,
      { expiresIn: "10m" }
    );

    res.json({ accessToken });
  });
};

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */
module.exports = { register, login, getAllUsers, refreshToken };
