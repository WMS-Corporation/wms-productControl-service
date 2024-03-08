const {collections} = require("../config/dbConnection");
const asyncHandler = require("express-async-handler");

const createProduct = asyncHandler(async (product) => {
    const result = await collections?.products?.insertOne(product);
    if (result) {
        return result;
    } else {
        throw new Error('Failed to create product');
    }
});

const findProducts = asyncHandler(async () => {
    return await collections?.products?.find().toArray()
})

const findProductById = asyncHandler(async (codProduct) => {
    return await collections?.products?.findOne({ _codProduct: codProduct })
});

const modifyProduct = asyncHandler(async(filter, update) => {
    const options = { returnOriginal: false}
    await collections?.products?.findOneAndUpdate(filter, update, options)
    return await collections?.products?.findOne(filter)
})

const deleteProduct = asyncHandler(async (codProduct) => {
    return await collections?.products?.deleteOne({_codProduct: codProduct})
})

module.exports = {
    createProduct,
    findProducts,
    findProductById,
    modifyProduct,
    deleteProduct
}