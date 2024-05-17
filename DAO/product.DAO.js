// product.DAO.js

const { Product } = require("../models/product.model");

const ProductDAO = {
  getProductById: async (productId) => {
    try {
      // Tìm sản phẩm theo ID trong cơ sở dữ liệu
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      throw new Error("Error fetching product by ID");
    }
  },

  getAllProducts: async () => {
    try {
      // Lấy tất cả sản phẩm từ cơ sở dữ liệu
      const products = await Product.find();
      return products;
    } catch (error) {
      throw new Error("Error fetching all products");
    }
  },

  getProductsByPage: async (pageNumber) => {
    const PAGE_SIZE = 10; // Số lượng sản phẩm trên mỗi trang

    try {
      const skip = (pageNumber - 1) * PAGE_SIZE; // Số lượng sản phẩm cần bỏ qua
      const products = await Product.find().skip(skip).limit(PAGE_SIZE); // Lấy sản phẩm theo trang
      return products;
    } catch (error) {
      throw new Error("Error fetching products");
    }
  },

  updateProduct: async (productId, productData) => {
    try {
      // Cập nhật thông tin sản phẩm trong cơ sở dữ liệu
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        productData,
        { new: true }
      );
      if (!updatedProduct) {
        throw new Error("Product not found");
      }
      return updatedProduct;
    } catch (error) {
      throw new Error("Error updating product");
    }
  },

  createProduct: async (productData) => {
    try {
      // Tạo mới sản phẩm trong cơ sở dữ liệu
      const newProduct = new Product(productData);
      await newProduct.save();
      return newProduct;
    } catch (error) {
      throw new Error("Error creating product");
    }
  },

  deleteProduct: async (productId) => {
    try {
      // Xoá sản phẩm từ cơ sở dữ liệu
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        throw new Error("Product not found");
      }
    } catch (error) {
      throw new Error("Error deleting product");
    }
  },
};

module.exports = ProductDAO;
