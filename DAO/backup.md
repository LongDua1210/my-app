// services/productService.js

const { Product } = require("../models/product.model");
// const { client, TIME_LIMIT } = require("../redis/init.redis");

// function updateRedis(productId, updatedProduct, callback) {
//   // Set lại giá trị của sản phẩm trong Redis
//   client.set(productId, JSON.stringify(updatedProduct), (error, reply) => {
//       if (error) {
//           console.error("Error updating Redis cache:", error);
//           callback(error);
//       } else {
//           console.log("Updated Redis cache for product:", productId);
//           callback(null, reply);
//       }
//   });
// }



class ProductService {
  async getAllProducts() {
    try {
      // Lấy tất cả sản phẩm từ cơ sở dữ liệu
      const products = await Product.find();
      return products;
    } catch (error) {
      throw new Error("Error fetching products");
    }
  }

  async getProductById(productId) {
    try {
      // const product = await Product.findById(productId);
      // return product

      // Kiểm tra xem có dữ liệu sản phẩm đã được cache trong Redis hay không

      // const prodCache = await client.get(productId);

      // if (prodCache) {
      //   console.log("Có dữ liệu từ Redis cache");
      //   return JSON.parse(prodCache);

      // } else {
      //   console.log("Sản Phẩm không có trong redis");
      //   // Nếu không, lấy dữ liệu từ cơ sở dữ liệu MongoDB
      //   const product = await Product.findById(productId);

      //   if (!product) {
      //     throw new Error("Product not found")
      //   } else {
      //     client.set(productId, JSON.stringify(product));
      //     return product;
      //   }
      // }
      return true;

    } catch (error) {
      return new Error("Error fetching product");
    }
  }

  async createProduct(productData) {
    try {
      // Tạo một sản phẩm mới
      console.log(productData, "data");
      const newProduct = new Product(productData);
      await newProduct.save();
      return newProduct;
    } catch (error) {
      throw new Error("Error creating product");
    }
  }

  async updateProduct(productId, productData) {
    try {
      // Cập nhật thông tin của một sản phẩm
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        productData,
        { new: true }
      );
      if (!updatedProduct) {
        throw new Error("Product not found");
      }
      updateRedis(productId, updatedProduct, (error, reply) => {
        if (error) {
            throw new Error("Error updating Redis");
        } else {
            console.log("Redis updated successfully");
        }
    });

      return updatedProduct;
    } catch (error) {
      throw new Error("Error updating product");
    }
  }

  async deleteProduct(productId) {
    try {
      // Xóa một sản phẩm từ cơ sở dữ liệu
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        throw new Error("Product not found");
      }
      return deletedProduct;
    } catch (error) {
      throw new Error("Error deleting product");
    }
  }
}

module.exports = ProductService;
