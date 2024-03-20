const express = require('express');
const {addProduct, getProducts, getProductById, updateProductById, deleteProductById
} = require("../services/productServices");
const {verifyToken} = require("./authMiddleware");
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('OK');
})
router.post('/products', verifyToken, addProduct)
router.get("/products", verifyToken, getProducts)
router.get("/products:codProduct", verifyToken, getProductById)
router.put("/products:codProduct", verifyToken, updateProductById)
router.delete("/products:codProduct", verifyToken, deleteProductById)

module.exports = router;