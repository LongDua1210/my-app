// product.services.js

const ProductBusiness = require("../business/product_manager/product.business")


const ProductServices = {

     getProduct : async (req, res) => {
        console.log("get detail");
        try {
            const productId = req.params.id;
            // Gọi Business để lấy thông tin sản phẩm từ cơ sở dữ liệu
            const productData = await ProductBusiness.getProduct(productId);
            res.status(200).json(productData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    
     getAllProducts : async (req, res) => {
        try {
    
            // Gọi Business để lấy tất cả sản phẩm từ cơ sở dữ liệu
            const products = await ProductBusiness.getAllProducts(req);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    
     updateProduct : async (req, res) => {
        try {
            const productId = req.params.id;
            const productData = req.body;
            // Gọi Business để cập nhật thông tin sản phẩm trong cơ sở dữ liệu
            const updatedProductData = await ProductBusiness.updateProduct(productId, productData);
            res.status(200).json(updatedProductData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    
     createProduct : async (req, res) => {
        try {
            const productData = req.body;
            // Gọi Business để tạo mới sản phẩm trong cơ sở dữ liệu
            const newProduct = await ProductBusiness.createProduct(productData);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    
     deleteProduct : async (req, res) => {
        try {
            const productId = req.params.id;
            // Gọi Business để xoá sản phẩm từ cơ sở dữ liệu
            await ProductBusiness.deleteProduct(productId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    
}

module.exports = ProductServices;