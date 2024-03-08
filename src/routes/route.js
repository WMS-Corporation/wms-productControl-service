const express = require('express');
const {addProduct, getProducts, getProductById, updateProductById, deleteProductById
} = require("../services/productServices");
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
})
router.post('/products', addProduct)
router.get("/products", getProducts)
router.get("/products:codProduct", getProductById)
router.put("/products:codProduct", updateProductById)
router.delete("/products:codProduct", deleteProductById)

module.exports = router;