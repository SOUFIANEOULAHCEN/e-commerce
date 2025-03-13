const mongoose = require("mongoose");
require("dotenv").config();
const url_connect = process.env.URL_CONNECTION;

const connectDb = async () => {
  try {
    // const conn = await mongoose.connect("mongodb://localhost:27017/app-express");
    const conn = await mongoose.connect(url_connect);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDb;
