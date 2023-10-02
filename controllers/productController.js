const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

//!desc Get all products
//!route GET /api/products
//!access public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

//!desc Create new product
//!route POST /api/products
//!access public
const createProduct = asyncHandler(async (req, res) => {
  const {
    productType,
    productBrand,
    productModel,
    productPrice,
    productImage,
  } = req.body;

  if (
    !productType ||
    !productBrand ||
    !productModel ||
    !productPrice ||
    !productImage
  ) {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }

  const newProduct = await Product.create({
    productType,
    productBrand,
    productModel,
    productPrice,
    productImage,
  });

  res.status(201).json(newProduct);
});

//!desc Get product
//!route GET /api/products/:id
//!access public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Contact not found');
  }

  res.status(200).json(product);
});

//!desc Update product
//!route PUT /api/products/:id
//!access public
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Contact not found');
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedProduct);
});

//!desc Delete products
//!route DELETE /api/products/:id
//!access public
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Contact not found');
  }

  const deletedProduct = await Product.findByIdAndDelete(req.params.id);

  res.status(200).json(deletedProduct);
});

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
