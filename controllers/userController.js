const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

//!desc Register a user
//!route POST /api/users/register
//!access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, passwordConfirm } = req.body;

  if (!username || !email || !password || !passwordConfirm) {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }

  if (password !== passwordConfirm) {
    res.status(400);
    throw new Error('Password and confirm password do not match!');
  }

  const userAvailable = await User.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error('User already registered!');
  }

  const user = await User.create({
    username,
    email,
    password,
    passwordConfirm,
  });

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error('User data is not valid!');
  }
});

//!desc Login user
//!route POST /api/users/login
//!access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1m' }
    );

    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error('Email or Password is not valid!');
  }
});

//!desc Current user
//!route GET /api/users/current
//!access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
