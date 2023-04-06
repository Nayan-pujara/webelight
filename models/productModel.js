const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
  },
  description: {
    type: String,
    required: [true, 'Please enter product description'],
  },
  sku: {
    type: String,
    required: [true, 'Please enter product sku'],
    lowercase: true,
  },
  category: {
    type: String,
    required: [true, 'Please enter product category'],
    lowercase: true,
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
  },
  image: {
    type: String,
    required: [true, 'Please enter product image'],
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
