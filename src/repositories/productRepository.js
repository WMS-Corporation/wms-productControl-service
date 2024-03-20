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

/**
 * Generates a unique task code.
 *
 * This function generates a unique task code by retrieving the next available code from the counter collection,
 * incrementing the count, and returning the next code as a string padded with zeros to ensure a fixed length of 6 characters.
 *
 * @returns {string} The next unique task code.
 */
const generateUniqueTaskCode = asyncHandler (async () => {
    const nextCode = await collections?.counter?.findOne()
    await collections.counter.updateOne({}, { $inc: {count: 1}})
    return nextCode.count.toString().padStart(6, '0')
})

module.exports = {
    createProduct,
    findProducts,
    findProductById,
    modifyProduct,
    deleteProduct,
    generateUniqueTaskCode
}