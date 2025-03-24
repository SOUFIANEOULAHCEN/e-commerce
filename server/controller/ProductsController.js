const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, countInStock, imageUrl, code } =
      req.body;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !countInStock ||
      !imageUrl ||
      !code
    ) {
      return res.status(400).json({ message: "all filed are required" });
    }
    const productExisting = await Product.findOne({ code }).exec();
    if (productExisting) {
      return res.status(401).json({ message: "product alreday exist " });
    }
    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      countInStock,
      imageUrl,
      code,
    });
    res.status(201).json({
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      category: newProduct.category,
      countInStock: newProduct.countInStock,
      imageUrl: newProduct.imageUrl,
      code: newProduct.code,
    });
  } catch (error) {
    console.error("Product creation error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).exec();
    res.status(200).json(products);
  } catch (error) {
    console.error("Product creation error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getProductByCode = async (req, res) => {
  try {
    const product = await Product.findOne({ code: req.params.code }).exec();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Product creation error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ code: req.params.code }).exec();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const { name, description, price, category, countInStock, imageUrl, code } =
      req.body;
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.countInStock = countInStock;
    product.imageUrl = imageUrl;
    product.code = code;
    await product.save();
    return res.status(200).json(product);
  } catch (error) {
    console.error("Product creation error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany({}).exec();
    return res.status(200).json({ message: "All products deleted" });
  } catch (error) {
    console.error("Product creation error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
// const deleteProductByCode = async (req, res) => {
//   try {
//     const product = await product.findOne({ code: req.params.code }).exec();
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     // await product.remove();
//     await Product.deleteOne({ _id: product._id });
//     return res.status(200).json({ message: "Product deleted" });
//   } catch (error) {
//     console.error("Product creation error:", error);
//     return res
//       .status(500)
//       .json({ message: "Server error", error: error.message });
//   }
// };

const deleteProductByCode = async (req, res) => {
  try {
    const productToDelete = await Product.findOne({ code: req.params.code }).exec();
    
    if (!productToDelete) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    // Utiliser deleteOne sur le modèle Product
    await Product.deleteOne({ _id: productToDelete._id });
    
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Product deletion error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
module.exports = {
  createProduct,
  getProducts,
  getProductByCode,
  updateProduct,
  deleteAllProducts,
  deleteProductByCode,
};
