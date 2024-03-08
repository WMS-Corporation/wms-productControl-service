const {Product} = require("../entities/product");

/**
 * Creates a user object from user data.
 *
 * This function creates a user object from the provided user data.
 *
 * @param {Object} productData - The user data to create the user object from.
 * @returns {Product} The created user object.
 */
function createProductFromData(productData) {
    return new Product(productData._codProduct, productData._name, productData._category, productData._expirationDate, productData._stock, productData._type)
}

module.exports = {createProductFromData}