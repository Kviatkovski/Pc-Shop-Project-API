const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add the user name'],
    },
    email: {
      type: String,
      required: [true, 'Please add a user email address'],
      unique: [true, 'Emil is already taken'],
    },
    password: {
      type: String,
      required: [true, 'Please add the user password'],
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm user password'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);

  this.passwordConfirm = undefined;

  next();
});

module.exports = mongoose.model('User', userSchema);
