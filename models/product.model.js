// models/product.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Định nghĩa schema cho Product
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  img_url: {
    type: String,
    required: false,
  },
});

// Tạo model Product từ schema
const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
