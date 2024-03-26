const express = require('express');
const {addProduct, getProducts, getProductById, updateProductById, deleteProductById
} = require("../services/productServices");
const {verifyToken} = require("./authMiddleware");
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('OK');
})
router.post('/create', verifyToken, addProduct)
router.get("/all", verifyToken, getProducts)
router.get("/:codProduct", verifyToken, getProductById)
router.put("/:codProduct", verifyToken, updateProductById)
router.delete("/:codProduct", verifyToken, deleteProductById)

module.exports = router;