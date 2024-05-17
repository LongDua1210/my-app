// product.business.js

const ProductDAO = require("../../DAO/product.DAO");
const client = require("../../redis/init.redis");

function updateRedis(productId, updatedProduct, callback) {
  // Set lại giá trị của sản phẩm trong Redis
  client.set(productId, JSON.stringify(updatedProduct), (error, reply) => {
    if (error) {
      console.error("Error updating Redis cache:", error);
      callback(error);
    } else {
      console.log("Updated Redis cache for product:", productId);
      callback(null, reply);
    }
  });
}

const ProductBusiness = {
  getProduct: async (productId) => {
    try {
      // Kiểm tra xem có dữ liệu sản phẩm đã được cache trong Redis hay không

      const prodCache = await client.get(productId);

      if (prodCache) {
        console.log("Có dữ liệu từ Redis cache");
        return JSON.parse(prodCache);
      } else {
        console.log("Sản Phẩm không có trong redis");

        // Nếu không, lấy dữ liệu từ cơ sở dữ liệu MongoDB
        const product = await ProductDAO.getProductById(productId);

        if (!product) {
          throw new Error("Product not found");
        } else {
          client.set(productId, JSON.stringify(product));
          return product;
        }
      }
    } catch (error) {
      throw new Error("Error getting product");
    }
  },

  getAllProducts: async (req) => {
    try {
      let products;
      if (req.query.page) {
        products = await ProductDAO.getProductsByPage(req.query.page)
      } else {
        // Gọi DAO để lấy tất cả sản phẩm từ cơ sở dữ liệu
         products = await ProductDAO.getAllProducts();
      }

      return products;
    } catch (error) {
      throw new Error("Error getting all products");
    }
  },

  updateProduct: async (productId, productData) => {
    try {
      // Gọi DAO để cập nhật thông tin sản phẩm trong cơ sở dữ liệu
      const updatedProductData = await ProductDAO.updateProduct(
        productId,
        productData
      );
      return updatedProductData;
    } catch (error) {
      throw new Error("Error updating product");
    }
  },

  createProduct: async (productData) => {
    try {
      // Gọi DAO để tạo mới sản phẩm trong cơ sở dữ liệu
      const newProduct = await ProductDAO.createProduct(productData);
      return newProduct;
    } catch (error) {
      throw new Error("Error creating product");
    }
  },

  deleteProduct: async (productId) => {
    try {
      // Gọi DAO để xoá sản phẩm từ cơ sở dữ liệu
      await ProductDAO.deleteProduct(productId);
    } catch (error) {
      throw new Error("Error deleting product");
    }
  },
};

module.exports = ProductBusiness;
