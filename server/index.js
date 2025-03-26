const express = require("express");
const routerAuth = require("./routes/authRouter");
const productRouter = require("./routes/productsRouter");
const connectionDb = require("./config/ConnectDb");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const verifyToken = require("./middleware/isAuth");
// -----------------------------------------

require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// connection to db
connectionDb();

// ---Route--------------------------------------------

app.use("/auth", routerAuth);
app.use("/products", productRouter);
// app.use("/", router);

// -----------------------------------------------

app.listen(port, () => {
  console.log(`connected on ${port}`);
});
