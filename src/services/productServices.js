const {createProductFromData} = require("../factories/productFactory");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const {createProduct, findProducts, findProductById, modifyProduct, deleteProduct
} = require("../repositories/productRepository");
const {connectDB} = require("../config/dbConnection");

const addProduct = asyncHandler(async(req, res) => {
    const product = createProductFromData(req.body);
    if (!product.codProduct || !product.name || !product.category || !product.expirationDate || !product.stock || !product.type) {
        return res.status(401).json({ message: 'Invalid product data' })
    }
    const productExists = await findProductById(product.codProduct);
    if(!productExists){
        const resultInsert = await createProduct(product)
        if(resultInsert){
            res.status(200).json({ message: 'Creation successful', product: product})
        }else{
            return res.status(401).json({ message: 'Invalid product data' })
        }
    }else{
        return res.status(401).json({ message: 'Product already exists' })
    }
})

const getProducts = asyncHandler(async(req, res) => {
    const result = await findProducts()
    if(result){
        res.status(200).json(result)
    } else {
        res.status(401).json({message: 'Invalid product data'})
    }
})

const getProductById = asyncHandler(async (req, res) => {
    const codProduct = req.params.codProduct
    if(codProduct){
        const product = await findProductById(codProduct)
        if(product){
            res.status(200).json(product)
        } else{
            res.status(401).json({message: 'Product not found'})
        }
    }else{
        res.status(401).json({message:'Invalid product data'})
    }
})

const updateProductById = asyncHandler(async (req, res) => {
    const codProduct = req.params.codProduct
    if(codProduct){
        const product = await findProductById(codProduct)
        if(product){
            const productReq = req.body
            const filter = { _codProduct: codProduct }
            const update = { $set: { _name: productReq.name, _category: productReq.category, _stock: productReq.stock, _expirationDate: productReq.expirationDate, _type: productReq.type } }
            const updatedProduct = await modifyProduct(filter, update)
            res.status(200).json(updatedProduct)
        } else{
            res.status(401).json({message: 'Product not found'})
        }
    }else{
        res.status(401).json({message:'Invalid product data'})
    }
})

const deleteProductById = asyncHandler(async (req, res) => {
    const codProduct = req.params.codProduct
    if(codProduct){
        const product = await findProductById(codProduct)
        if(product){
            const productCode = product._codProduct
            await deleteProduct(productCode)
            res.status(200).json(productCode)
        } else{
            res.status(401).json({message: 'Product not found'})
        }
    }else{
        res.status(401).json({message:'Invalid product data'})
    }
})

module.exports = {
    addProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById
}