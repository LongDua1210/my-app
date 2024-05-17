// routes/productRoutes.js

const express = require("express");
const ProductServices = require("../services/product.services");
const router = express.Router();


router.get("/products/:id",ProductServices.getProduct );
router.get("/products", ProductServices.getAllProducts);
router.post("/products", ProductServices.createProduct);
router.put("/products/:id", ProductServices.updateProduct);
router.delete("/products/:id", ProductServices.deleteProduct);

module.exports = router;