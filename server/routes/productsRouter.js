const express = require("express");
const {
  createProduct,
  getProducts,
  getProductByCode,
  updateProduct,
  deleteAllProducts,
  deleteProductByCode,
} = require("../controller/ProductsController");
const { verifyToken } = require("../middleware/isAuth");

const routerProduct = express.Router();

routerProduct.post("/create", createProduct);
routerProduct.get("/", getProducts);
routerProduct.get("/:code", getProductByCode);
routerProduct.put("/edit/:code", updateProduct);
routerProduct.delete("/delete/:code", deleteProductByCode);
routerProduct.delete("/delete", deleteAllProducts);

module.exports = routerProduct;
