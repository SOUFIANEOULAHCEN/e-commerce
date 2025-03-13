const express = require("express");
const routerAuth = require("./routes/authRouter");
const connectionDb = require("./config/ConnectDb");
const cookieParser = require('cookie-parser')
// -----------------------------------------

require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cookieParser()); 
// connection to db
connectionDb();

// ---Route--------------------------------------------

app.use("/auth", routerAuth);

// app.use("/", router);

// -----------------------------------------------

app.listen(port, () => {
  console.log(`connected on ${port}`);
});
