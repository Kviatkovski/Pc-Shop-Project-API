const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productType: {
      type: String,
      required: [true, 'A tour must have a type'],
    },
    productBrand: {
      type: String,
      required: [true, 'A tour must have a brand'],
    },
    productModel: {
      type: String,
      required: [true, 'A tour must have a model'],
    },
    productPrice: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    productImage: {
      type: String,
      required: [true, 'A tour must have a image'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
