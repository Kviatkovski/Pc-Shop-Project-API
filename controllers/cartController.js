const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');

//!desc Get all Carts
//!route GET /api/carts
//!access private
const getCarts = asyncHandler(async (req, res) => {
  const carts = await Cart.find({ user_id: req.user.id });
  res.status(200).json(carts);
});

//!desc Create new Cart
//!route POST /api/carts
//!access private
const createCart = asyncHandler(async (req, res) => {
  const newCart = new Cart(req.body);
  const savedCart = await newCart.save();
  res.status(200).json(savedCart);
});

//!desc Get user Cart
//!route GET /api/carts/find/:userId
//!access private
const getUserCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  res.status(200).json(cart);
});

//!desc Update Cart
//!route PUT /api/carts/:id
//!access private
const updateCart = asyncHandler(async (req, res) => {
  const updatedCart = await Cart.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  res.status(200).json(updatedCart);
});

//!desc Delete Cart
//!route DELETE /api/carts/:id
//!access private
const deleteCart = asyncHandler(async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.status(200).json('Cart has been deleted...');
});

module.exports = { getCarts, createCart, getUserCart, updateCart, deleteCart };
