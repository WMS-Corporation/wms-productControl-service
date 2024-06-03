const {createProductFromData} = require("../factories/productFactory");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const {createProduct, findProducts, findProductById, modifyProduct, deleteProduct, generateUniqueTaskCode
} = require("../repositories/productRepository")

const addProduct = asyncHandler(async(req, res) => {
    let product

    if(verifyBodyFields(req.body, productValidFields)){
        product = createProductFromData(req.body)
    } else {
        return res.status(401).json({ message: 'Invalid request body. Please ensure all required fields are included and in the correct format.' })
    }

    if (!product.name || !product.category || !product.expirationDate || !product.type) {
        return res.status(401).json({ message: 'Invalid product data' })
    }
    const productExists = await findProductById(product.codProduct);
    if(!productExists){
        product.codProduct = await generateUniqueTaskCode()
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

    function validateBodyFields(body) {
        const bodyFields = Object.keys(body);
        for (let field of bodyFields) {
            if (!validFields.includes(field)) {
                return false;
            }
        }
        return true;
    }

    const validFields = [
        "_name",
        "_category",
        "_expirationDate",
        "_type",
    ];

    if(codProduct){
        const product = await findProductById(codProduct)
        if(product){
            if(!validateBodyFields(req.body)){
                res.status(401).json({message: 'Product does not contain any of the specified fields or you can not update them.'})
            } else {
                const filter = {_codProduct: codProduct}
                const update = {$set: req.body}
                const updatedProduct = await modifyProduct(filter, update)
                res.status(200).json(updatedProduct)
            }
        } else{
            res.status(401).json({message: 'Product not found'})
        }
    } else{
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

const verifyBodyFields = (body, validFields) => {
    const presentFields = Object.keys(body)
    return validFields.every(field => presentFields.includes(field))
}

const productValidFields = [
    "_name",
    "_category",
    "_expirationDate",
    "_type"
]

module.exports = {
    addProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById
}